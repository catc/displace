const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
	'css?sourceMap',
	'sass?sourceMap' + '&includePaths[]=' + path.resolve(__dirname, './assets/scss/')
];

module.exports = [
	{
		entry: {
			app: './assets/js/main.js'
		},
		// entry: './assets/js/main.js',

		// resolves paths similar to NODE_PATH=.
		// resolve: {root: __dirname + '/' },
		resolve: {
			root: [
				__dirname + '/',
				__dirname + '/assets/scss'
			]
		},
		output: {
			path: path.resolve(__dirname, 'assets'),
			publicPath: '/assets/',
			filename: 'bundle.js' 	// can change to [name].js
		},
		sassLoader: {
			/*includePaths: [
				// is it req?
				path.resolve(__dirname, './assets/scss')
			]*/
		},
		devtool: 'source-map',
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract('style', sassLoaders.join('!'))
				}
			]
		},
		plugins: [
			// if do [name] and entry name (eg: entry.app), names it app.scss file
			// if do [name] and no entry name (as obj), uses first scss file
			// if do 'somename.scss', then sets it as that
			// new ExtractTextPlugin('style.css')
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
				},
				output: {
					comments: false
				}
			}),
			new ExtractTextPlugin('[name].css')
		],
		devServer: {
			// where index.html will be looked up
			inline: true,
			contentBase: './'
		}
	},
];
