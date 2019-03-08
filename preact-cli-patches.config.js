import MiniCssExtractPlugin from 'mini-css-extract-plugin';

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
			// To fix bug in preact-cli 2.x
			helpers.getPluginsByName(config, 'ExtractTextPlugin')
				.forEach(({ plugin }) => (plugin.options.disable = false));
			
			// To fix bug in preact-cli next
			helpers.getLoadersByName(config, 'style-loader').forEach(loader => loader.rule.use = [
				MiniCssExtractPlugin.loader,
				loader.rule.use[1],
				loader.rule.use[2]
			]);
		}
		else {
			// To fix bug in preact-cli
			config.output.chunkFilename = '[name].chunk.js';
		}
	}

	// sass-loader includePaths
	helpers.getLoadersByName(config, 'proxy-loader')
		.filter(r => r.loader.options.loader === 'sass-loader')
		.map(r => r.loader.options.options)
		.forEach(o => o.includePaths = (o.includePaths && o.includePaths.length > 0 && o.includePaths[0] instanceof Array) ? o.includePaths[0] : o.includePaths);


	// To fix bug in preact-cli which names css files numerically
	helpers.getPluginsByName(config, 'MiniCssExtractPlugin')
		.forEach(({ plugin }) => plugin.options.chunkFilename = plugin.options.chunkFilename.replace('[id]', '[name]'));
}
