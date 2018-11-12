const path = require('path');

module.exports = {
	entry: './firebase-functions-handler.js',
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
		path: path.resolve(__dirname, 'functions/app/build'),
		filename: 'index.js',
		library: '',
		libraryTarget: 'commonjs'
	},
	externals: {
		'firebase-functions': 'firebase-functions',
		'firebase-admin': 'firebase-admin'
	},
	node: {
		fs: 'empty',
		net: 'empty'
	}
};
