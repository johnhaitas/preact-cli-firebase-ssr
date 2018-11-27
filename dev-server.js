let serverConfig = require('./webpack.preact.server.config'),
	clientConfig = require('./webpack.preact.client.config');
serverConfig.name = 'server';
clientConfig.name = 'client';

const webpack = require('webpack'),
	webpackConfig = [ serverConfig, clientConfig ],
	compiler = webpack(webpackConfig),
	serverCompiler = compiler.compilers.find(compiler => compiler.name === 'server'),
	clientCompiler = compiler.compilers.find(compiler => compiler.name === 'client'),
	webpackIsomorphicDevMiddleware = require('webpack-isomorphic-dev-middleware')(clientCompiler, serverCompiler),
	express = require('express'),
	app = express();

app.use(webpackIsomorphicDevMiddleware);
app.use((req, res, next) => {
	const template = clientCompiler.outputFileSystem.readFileSync(`${clientConfig.output.path}/index.html`).toString('utf-8'),
		{ createHandler } = res.locals.isomorphic.exports,
		handler = createHandler(template);
	handler(req, res);
});

app.listen(8080, () => console.log('app is listening!'));

