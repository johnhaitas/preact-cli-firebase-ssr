const { resolve } = require('path');

const preactCliServerConfig = require('preact-cli/lib/lib/webpack/webpack-server-config').default;

const cwd = __dirname,
	src = resolve(cwd, 'src'),
	dest = resolve(cwd, 'build'),
	env = {
		cwd,
		isWatch: true,
		isProd: true,
		src,
		dest,
		source: dir => resolve(src, dir)
	};

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

module.exports = config;
