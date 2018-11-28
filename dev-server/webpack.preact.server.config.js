const { resolve } = require('path'),
	asyncPlugin = require('preact-cli-plugin-fast-async'),
	WebpackConfigHelpers = require('./webpack-config-helpers');

const preactCliServerConfig = require('preact-cli/lib/lib/webpack/webpack-server-config').default;

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
		source,
		ssr: true
	},
	helpers = new WebpackConfigHelpers(cwd);

let config = preactCliServerConfig(env);
config.watchOptions = {
	ignored: [
		resolve(cwd, 'node_modules'),
		resolve(cwd, 'build/ssr-bundle'),
		resolve(cwd, 'functions')
	]
};

config.entry['ssr-bundle'] = env.source('server/index.js');
config.output.filename = '[name].js';

// To fix bug in preact-cli
helpers.getPluginsByName(config, 'ExtractTextPlugin')
	.forEach(({ plugin }) => (plugin.options.disable = false));

asyncPlugin(config);

module.exports = config;
