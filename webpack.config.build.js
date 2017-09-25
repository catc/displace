const webpack = require('webpack');
const pack = require('package');

const banner = `${pack.name}.js ${pack.version} - ${pack.description}
Copyright (c) ${new Date().getFullYear()} ${pack.author} - ${pack.homepage}
License: ${pack.license}`;

const PROD = process.env.NODE_ENV === 'prod';

const plugins = [
	new webpack.BannerPlugin(banner)
];
if (PROD){
	plugins.unshift(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
		},
		output: {
			comments: false
		}
	}));
}

new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false,
	},
	output: {
		comments: false
	}
});

module.exports = {
	context: __dirname + '/src',
	entry: './index.js',
	output: {
		path: __dirname + '/dist',
		filename: `displace${PROD ? '.min' : ''}.js`,
		library: `${pack.name}`,
		libraryTarget: 'umd'
	},
	resolve: {
		root: __dirname + '/src'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	plugins: plugins
};