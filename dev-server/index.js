const runServer = async () => {
	const { findCompilerNamed, readOutputFileSync, requireOutputFileSync, requestLogger } = require('./utils'),
		multiConfig = await (require('./load-preact-config'))(),
		multiCompiler = require('webpack')(multiConfig),
		serverCompiler = findCompilerNamed(multiCompiler, 'server'),
		clientCompiler = findCompilerNamed(multiCompiler, 'client'),
		webpackIsomorphicDevMiddleware = require('webpack-isomorphic-dev-middleware')(clientCompiler, serverCompiler),
		webpackHotMiddleware = require('webpack-hot-middleware')(clientCompiler),
		hotHandlerMiddleware = require('./generate-hot-middleware')(multiCompiler, () => {
			const template = readOutputFileSync(clientCompiler, 'index.html'),
				{ createHandler } = requireOutputFileSync(serverCompiler, 'ssr-bundle.js');
			return createHandler(template);
		}),
		express = require('express'),
		app = express();

	app.use(requestLogger);
	app.use(webpackIsomorphicDevMiddleware);
	app.use(webpackHotMiddleware);
	app.use(hotHandlerMiddleware);

	app.listen(8080, () => console.log('app is listening!')); // eslint-disable-line no-console
};

runServer();
