const path = require('path');

const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: __dirname + '/app/index.js',
  mode: 'development',
	module: {
		rules: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				include: /app/,
				loader: 'babel-loader',
			},
			{
			  test: /\.(png|jpg)$/,
			  loader: 'url-loader',
				exclude: /app\/images/,
			},
			{
			  test: /\.svg$/,
			  loader: 'file-loader'
			},
			{
			  test: /\.(svg|jpg|png)$/,
				include: /app\/images/,
			  loader: 'file-loader'
			}
		],
	},
  resolve: {
    extensions: ['.js', '.jsx']
  },
	output: {
		filename: 'transformed.js',
		path: __dirname + '/build'
	},
	plugins: [
		HTMLWebpackPluginConfig
  ]
};

module.exports.serve = {
  content: [__dirname],
  add: (app, middleware, options) => {
    const historyOptions = {
      index: '/index.html',
    };

    app.use(convert(history(historyOptions)));
  },
};