const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './product',
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development'
})