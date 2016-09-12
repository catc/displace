const webpack = require('webpack');
const path = require('path');

module.exports = [
	{
		entry: './docs/js/main.js',
		// entry: './gh-page/js/main.js',

		// resolves paths similar to NODE_PATH=.
		// resolve: {root: __dirname + '/' },
		resolve: {
			root: [
				__dirname + '/',
			]
		},
		output: {
			path: path.resolve(__dirname, 'docs'),
			publicPath: '/',
			filename: 'bundle.js' 	// can change to [name].js if multiple entry points
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				}
			]
		},
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
				},
				output: {
					comments: false
				}
			})
		],
	}
];
