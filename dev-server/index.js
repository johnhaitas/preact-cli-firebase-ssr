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
	webpackIsomorphicDevMiddleware = require('webpack-isomorphic-dev-middleware')(clientCompiler, serverCompiler),
	webpackHotMiddleware = require('webpack-hot-middleware')(clientCompiler),
	express = require('express'),
	app = express();

let handler;
compiler.plugin('done', stats => {
	const template = clientCompiler.outputFileSystem.readFileSync(`${clientConfig.output.path}/index.html`).toString('utf-8'),
		{ createHandler } = requireFromString(serverCompiler.outputFileSystem.readFileSync(`${serverConfig.output.path}/ssr-bundle.js`).toString('utf-8'));
	handler = createHandler(template);
});

app.use(webpackIsomorphicDevMiddleware);
app.use(webpackHotMiddleware);
app.use((req, res, next) => handler(req, res));

app.listen(8080, () => console.log('app is listening!'));

