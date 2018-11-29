const { resolve } = require('path'),
	asyncPlugin = require('preact-cli-plugin-fast-async'),
	WebpackConfigHelpers = require('./webpack-config-helpers');

const preactCliClientConfig = require('preact-cli/lib/lib/webpack/webpack-client-config').default;

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
		ssr: false
	},
	helpers = new WebpackConfigHelpers(cwd);

let config = preactCliClientConfig(env);
config.watchOptions = {
	ignored: [
		resolve(cwd, 'node_modules'),
		resolve(cwd, 'build'),
		resolve(cwd, 'functions')
	]
};

config.entry.bundle = [
	((config.entry.bundle instanceof Array) ? config.entry.bundle[0] : config.entry.bundle),
	'webpack-hot-middleware/client'
];

// in case you want to change your template
// helpers.setHtmlTemplate(config, `!!ejs-loader!${source('template.html')}`);

asyncPlugin(config);

module.exports = config;
