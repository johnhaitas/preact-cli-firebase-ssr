const { resolve } = require('path');

const preactCliClientConfig = require('preact-cli/lib/lib/webpack/webpack-client-config').default;

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

module.exports = config;
