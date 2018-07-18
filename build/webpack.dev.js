
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const vConsolePlugin = require('vconsole-webpack-plugin');
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './product',
    hot: true,
    host: '192.168.2.217',
    proxy: {
      "/japi": {
        target: "https://tokenworldtest94.aiyuangong.com",
        changeOrigin: true, //跨域
        // pathRewrite: {"^/api" : ""}
      },
      "/api": {
        target: "https://tokenworldtest94.aiyuangong.com",
        changeOrigin: true, //跨域
        // pathRewrite: {"^/api" : ""}
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: path.resolve('./utils/injectHtml.js')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]',
                    // outputPath: 'img/',
                    // publicPath: 'https://www.tokenworld.pro/help/'
                }
            }
        ]
    },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new vConsolePlugin({
      filter: ['../utils'],
      enable: true // 发布代码前记得改回 false
    }),
  ],
  mode: 'development'
})