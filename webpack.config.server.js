const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
	// 'css?sourceMap',
	// 'sass?sourceMap' + '&includePaths[]=' + path.resolve(__dirname, './gh-page/scss/')
	'css',
	'sass' + '?includePaths[]=' + path.resolve(__dirname, './docs/scss/')
];

module.exports = [
	{
		entry: './docs/js/main.js',
		// entry: './gh-page/js/main.js',

		// resolves paths similar to NODE_PATH=.
		// resolve: {root: __dirname + '/' },
		resolve: {
			root: [
				__dirname + '/',
				__dirname + '/docs/scss'
			]
		},
		output: {
			path: path.resolve(__dirname, 'docs'),
			publicPath: '/',
			filename: 'bundle.js' 	// can change to [name].js if multiple entry points
		},
		sassLoader: {
			/*includePaths: [
				// is it req?
				path.resolve(__dirname, './docs/scss')
			]*/
		},
		// devtool: 'source-map',
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
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
				},
				output: {
					comments: false
				}
			}),
			// if do [name] and entry name (eg: entry.app), names it app.scss file
			// if do [name] and no entry name (as obj), uses first scss file
			// if do 'somename.scss', then sets it as that
			// new ExtractTextPlugin('style.css')
			new ExtractTextPlugin('style.css')
		],
		devServer: {
			// where index.html will be looked up
			// inline: true,
			contentBase: './docs/'
		}
	}
];
