const { resolve } = require('path'),
	CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDir = 'functions/app/build';

module.exports = {
	entry: {
		functions: './firebase-functions-handler.js'
	},
	name: 'commonjs',
	module: {
		rules: [{
			test: /\.html$/,
			use: [ {
				loader: 'raw-loader'
			}]
		}]
	},
	output: {
		path: resolve(__dirname, outputDir),
		filename: '[name].js',
		library: '',
		libraryTarget: 'commonjs'
	},
	externals: {
		'firebase-functions': 'firebase-functions',
		'firebase-admin': 'firebase-admin'
	},
	plugins: [
		new CopyWebpackPlugin([
			'ssr-bundle.js'
		].map(f => ({
			from: resolve(__dirname, `build/ssr-build/${f}`),
			to: resolve(__dirname, `${outputDir}/${f}`)
		})))
	],
	node: {
		fs: 'empty',
		net: 'empty'
	}
};
