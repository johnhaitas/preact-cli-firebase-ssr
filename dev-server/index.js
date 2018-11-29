let serverConfig = require('./webpack.preact.server.config'),
	clientConfig = require('./webpack.preact.client.config');
serverConfig.name = 'server';
clientConfig.name = 'client';

const { findCompilerNamed, readOutputFileSync, requireOutputFileSync, requestLogger } = require('./utils'),
	multiCompiler = require('webpack')([ serverConfig, clientConfig ]),
	serverCompiler = findCompilerNamed(multiCompiler, 'server'),
	clientCompiler = findCompilerNamed(multiCompiler, 'client'),
	webpackIsomorphicDevMiddleware = require('webpack-isomorphic-dev-middleware')(clientCompiler, serverCompiler),
	webpackHotMiddleware = require('webpack-hot-middleware')(clientCompiler),
	hotHandlerMiddleware = (() => {
		let handler;
		multiCompiler.plugin('done', stats => {
			const template = readOutputFileSync(clientCompiler, 'index.html'),
				{ createHandler } = requireOutputFileSync(serverCompiler, 'ssr-bundle.js');
			handler = createHandler(template);
		});
		return (req, res, next) => handler(req, res);
	})(),
	express = require('express'),
	app = express();

app.use(requestLogger);
app.use(webpackIsomorphicDevMiddleware);
app.use(webpackHotMiddleware);
app.use(hotHandlerMiddleware);

app.listen(8080, () => console.log('app is listening!')); // eslint-disable-line no-console
