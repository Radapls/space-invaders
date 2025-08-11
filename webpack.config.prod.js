/* ────────────────────────────────────────────────────────────── */
/*  webpack.config.prod.js                                        */
/* ────────────────────────────────────────────────────────────── */

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/space-invaders/',
  },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }],
  },
  resolve: { extensions: ['.ts', '.js'] },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      minify: { collapseWhitespace: true, removeComments: true },
    })
  ]
};
