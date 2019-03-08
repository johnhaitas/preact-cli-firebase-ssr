const { bold } = require('chalk');

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

	const port = 8080;
	app.listen(port, () => {
		const protocol = 'http',
			host = 'localhost',
			boldPort = bold(port),
			serverAddr = `${protocol}://${host}:${boldPort}`,
			localIpAddr = `${protocol}://${require('ip').address()}:${boldPort}`;

		process.stdout.write('\n\n');
		process.stdout.write('You can view the application in browser.\n\n');
		process.stdout.write(`${bold('Local:')}            ${serverAddr}\n`);
		process.stdout.write(`${bold('On Your Network:')}  ${localIpAddr}\n\n`);
		process.stdout.write('\n\n');
	});
};

runServer();
