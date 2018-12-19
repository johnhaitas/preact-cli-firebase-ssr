const { resolve } = require('path'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	buildDir = resolve(__dirname, 'build'),
	ssrBuildDir = `${buildDir}/ssr-build`,
	outputDir = resolve(__dirname, 'functions/app/build');

module.exports = {
	entry: {
		template: `!!raw-loader!${buildDir}/index.html`
	},
	name: 'commonjs',
	output: {
		path: outputDir,
		filename: '[name].js',
		library: 'template',
		libraryTarget: 'commonjs'
	},
	plugins: [
		new CleanWebpackPlugin([outputDir]),
		new CopyWebpackPlugin([
			'ssr-bundle.js'
		].map(f => ({
			from: `${ssrBuildDir}/${f}`,
			to: `${outputDir}/${f}`
		})))
	],
	node: {
		fs: 'empty',
		net: 'empty'
	}
};
