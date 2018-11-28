let serverConfig = require('./webpack.preact.server.config'),
	clientConfig = require('./webpack.preact.client.config');
serverConfig.name = 'server';
clientConfig.name = 'client';

const { findCompilerNamed, readOutputFileSync, requireOutputFileSync } = require('./utils'),
	webpack = require('webpack'),
	webpackMultiConfig = [ serverConfig, clientConfig ],
	multiCompiler = webpack(webpackMultiConfig),
	serverCompiler = findCompilerNamed(multiCompiler, 'server'),
	clientCompiler = findCompilerNamed(multiCompiler, 'client'),
	webpackIsomorphicDevMiddleware = require('webpack-isomorphic-dev-middleware')(clientCompiler, serverCompiler),
	webpackHotMiddleware = require('webpack-hot-middleware')(clientCompiler),
	express = require('express'),
	app = express(),
	requestLogger = (req, res, next) => {
		const startTime = Date.now(),
			{ method, url } = req;
		res.on('finish', () => console.log(`${res.statusCode} ${method} ${url} ${Date.now() - startTime}ms`)); // eslint-disable-line no-console
		next();
	};

let handler;
multiCompiler.plugin('done', stats => {
	const template = readOutputFileSync(clientCompiler, 'index.html'),
		{ createHandler } = requireOutputFileSync(serverCompiler, 'ssr-bundle.js');
	handler = createHandler(template);
});

app.use(requestLogger);
app.use(webpackIsomorphicDevMiddleware);
app.use(webpackHotMiddleware);
app.use((req, res, next) => handler(req, res));

app.listen(8080, () => console.log('app is listening!')); // eslint-disable-line no-console
