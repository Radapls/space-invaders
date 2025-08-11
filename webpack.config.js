/* ────────────────────────────────────────────────────────────── */
/*  webpack.config.dev.js                                         */
/* ────────────────────────────────────────────────────────────── */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    hot: true
  },

  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },

  resolve: { extensions: ['.ts', '.js'] },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public', to: '',
          globOptions: {
            ignore: ['**/index.html']
          },
        }
      ],
    }),
  ],
};
