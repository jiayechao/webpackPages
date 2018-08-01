
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
    host: 'localhost',
    proxy: {
      "/japi": {
        target: "https://tokenworldtest94.aiyuangong.com",
        changeOrigin: true, //跨域
      },
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
        test: /\.scss$/,
        use: [
            {
                loader: 'style-loader'
            },
            {
              loader: 'vue-style-loader'
            },
            {
                loader: 'css-loader'
            },
            {
                loader: 'postcss-loader',
                options: {
                    config: {
                        path: '.postcssrc.js'
                    }
                }
            },
            {
                loader: 'sass-loader'
            }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
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
      enable: false // 发布代码前记得改回 false
    }),
  ],
  mode: 'development'
})