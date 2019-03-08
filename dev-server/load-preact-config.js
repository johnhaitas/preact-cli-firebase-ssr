const { resolve } = require('path'),
	transformConfig = require('preact-cli/lib/lib/webpack/transform-config');

const cwd = resolve(__dirname, '..'),
	src = resolve(cwd, 'src'),
	dest = resolve(cwd, 'build'),
	source = dir => resolve(src, dir),
	env = {
		cwd,
		dest,
		src,
		source,

		config: 'preact.config.js',

		isProd: false,
		isWatch: true,
		
		esm: false,
		'inline-css': true,
		preload: true,
		sw: false
	};

let serverConfig = require('preact-cli/lib/lib/webpack/webpack-server-config')(env),
	clientConfig = require('preact-cli/lib/lib/webpack/webpack-client-config')(env);
serverConfig.name = 'server';
clientConfig.name = 'client';

clientConfig.entry.bundle = [
	((clientConfig.entry.bundle instanceof Array) ? clientConfig.entry.bundle[0] : clientConfig.entry.bundle),
	'webpack-hot-middleware/client'
];

module.exports = async () => {
	await transformConfig(env, serverConfig, true);
	await transformConfig(env, clientConfig, false);
	return [ serverConfig, clientConfig ];
};
