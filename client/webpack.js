var webpack = require('webpack');

module.exports = {
	entry : {
		'bundle-demo' : './src/entry-demo.js',
	},

	output : {
		filename : './dist/js/[name].js'
	},

	module : {
		loaders : [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.vue$/,
				loader: 'vue'
			},
		]
	},

	babel: {
		presets: ['es2015', 'stage-0']
	},

	plugins : [
		new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: '"debug"'
		  }
		}),
		new webpack.optimize.UglifyJsPlugin({
		  compress: {
		    warnings: false
		  }
		})
	]
};