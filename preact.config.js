import asyncPlugin from 'preact-cli-plugin-fast-async';
import preactCliSwPrecachePlugin from 'preact-cli-sw-precache';

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {
	
	if (env.production !== true) {
		config.devtool = 'eval-source-map'; // Improves debugging in VSCode with support for stepping through lines

		if (env.ssr === true) {
			// To fix bug in preact-cli
			helpers.getPluginsByName(config, 'ExtractTextPlugin')
				.forEach(({ plugin }) => (plugin.options.disable = false));

		}
		else {
			config.entry.bundle = [
				((config.entry.bundle instanceof Array) ? config.entry.bundle[0] : config.entry.bundle),
				'webpack-hot-middleware/client'
			];
		}
	}

	if (env.ssr) {
		config.entry['ssr-bundle'] = env.source('./server/index.js');
		config.output.filename = '[name].js';
	}

	const precacheConfig = {
		filename: 'sw.js',
		navigateFallback: '/',
		navigateFallbackWhitelist: [/^(?!\/__).*/],
		minify: true,
		stripPrefix: config.cwd,
		staticFileGlobsIgnorePatterns: [
			/index\.html$/,
			/\.esm\.js$/,
			/polyfills(\..*)?\.js$/,
			/\.map$/,
			/push-manifest\.json$/,
			/\.DS_Store/,
			/\.git/
		]
	};
	 
	preactCliSwPrecachePlugin(config, precacheConfig);

	asyncPlugin(config);
}
