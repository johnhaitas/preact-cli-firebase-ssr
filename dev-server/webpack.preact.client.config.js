const { resolve } = require('path');

const preactCliClientConfig = require('preact-cli/lib/lib/webpack/webpack-client-config').default;

const cwd = resolve(__dirname, '..'),
	src = resolve(cwd, 'src'),
	dest = resolve(cwd, 'build'),
	env = {
		cwd,
		isWatch: true,
		isProd: false,
		src,
		dest,
		source: dir => resolve(src, dir)
	};
let config = preactCliClientConfig(env);

config.watchOptions = {
	ignored: [
		resolve(cwd, 'node_modules'),
		resolve(cwd, 'build/*.js'),
		resolve(cwd, 'build/*.css'),
		resolve(cwd, 'build/*.map'),
		resolve(cwd, 'build/assets'),
		resolve(cwd, 'functions')
	]
};

config.entry.bundle = [
	((config.entry.bundle instanceof Array) ? config.entry.bundle[0] : config.entry.bundle),
	'webpack-hot-middleware/client'
];

module.exports = config;
