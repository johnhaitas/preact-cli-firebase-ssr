const { resolve } = require('path'),
	transformConfig = require('preact-cli/lib/lib/webpack/transform-config');

const cwd = resolve(__dirname, '..'),
	src = resolve(cwd, 'src'),
	dest = resolve(cwd, 'build'),
	source = dir => resolve(src, dir),
	env = {
		cwd,
		isWatch: true,
		isProd: false,
		src,
		dest,
		source
	};

let serverConfig = require('preact-cli/lib/lib/webpack/webpack-server-config')(env),
	clientConfig = require('preact-cli/lib/lib/webpack/webpack-client-config')(env);
serverConfig.name = 'server';
clientConfig.name = 'client';

module.exports = async () => {
	await transformConfig(env, serverConfig, true);
	await transformConfig(env, clientConfig, false);
	return [ serverConfig, clientConfig ];
};