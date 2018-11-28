const { resolve } = require('path'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	WebpackConfigHelpers = require('./webpack-config-helpers');

const preactCliServerConfig = require('preact-cli/lib/lib/webpack/webpack-server-config');

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
		resolve(cwd, 'build'),
		resolve(cwd, 'functions')
	]
};

config.entry['ssr-bundle'] = env.source('server/index.js');
config.output.filename = '[name].js';

// To fix bug in preact-cli
helpers.getLoadersByName(config, 'style-loader').forEach(loader => loader.rule.use = [
	MiniCssExtractPlugin.loader,
	loader.rule.use[1],
	loader.rule.use[2]
]);

module.exports = config;
