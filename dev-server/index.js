let serverConfig = require('./webpack.preact.server.config'),
	clientConfig = require('./webpack.preact.client.config');
serverConfig.name = 'server';
clientConfig.name = 'client';

const requireFromString = require('require-from-string'),
	webpack = require('webpack'),
	webpackConfig = [ serverConfig, clientConfig ],
	compiler = webpack(webpackConfig),
	serverCompiler = compiler.compilers.find(compiler => compiler.name === 'server'),
	clientCompiler = compiler.compilers.find(compiler => compiler.name === 'client'),
	readOutputFileSync = (compiler, filename) => compiler.outputFileSystem.readFileSync(`${compiler.outputPath}/${filename}`).toString('utf-8'),
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
compiler.plugin('done', stats => {
	const template = readOutputFileSync(clientCompiler, 'index.html'),
		{ createHandler } = requireFromString(readOutputFileSync(serverCompiler, 'ssr-bundle.js'));
	handler = createHandler(template);
});

app.use(requestLogger);
app.use(webpackIsomorphicDevMiddleware);
app.use(webpackHotMiddleware);
app.use((req, res, next) => handler(req, res));

app.listen(8080, () => console.log('app is listening!')); // eslint-disable-line no-console
