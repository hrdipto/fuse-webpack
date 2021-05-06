const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PUBLIC_DIR = path.join(__dirname, './public');
const PUBLIC_URL = process.env.PUBLIC_URL || '/';
const HTML_TEMPLATE = 'index.html';

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, '/dist'),
		filename: 'index_bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [require('tailwindcss'), require('autoprefixer')]
						}
					}
				]
			}
		]
	},
	plugins: [
		// new HtmlWebpackPlugin(),
		new HtmlWebpackPlugin({
			// template: `${PUBLIC_DIR}/${HTML_TEMPLATE}`,
			template: './src/index.html',
			filename: 'index.html',
			templateParameters: {
				PUBLIC_URL
			}
		}),
		new MiniCssExtractPlugin()
	],
	resolve: {
		alias: {
			'@fuse': path.resolve(__dirname, './src/@fuse/'),
			'@history': path.resolve(__dirname, './src/@history/'),
			'@lodash': path.resolve(__dirname, './src/@lodash'),
			i18n: path.resolve(__dirname, './src/i18n'),
			app: path.resolve(__dirname, './src/app/')
		}
	}
};
