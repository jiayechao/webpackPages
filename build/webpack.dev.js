
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './product',
    hot: true,
    host: '0.0.0.0',
    proxy: {
      "/japi": {
        // target: 'https://tokenworld.aiyuangong.com',
        target: "https://tokenworldtest94.aiyuangong.com",
        changeOrigin: true, //跨域
      },
      "/api": {
        target: "https://tokenworldtest94.aiyuangong.com",
        changeOrigin: true, //跨域
      }
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: path.resolve('./loaders/injectHtml.js')
      // },
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
                    // 'imgs/[name].[hash:7].[ext]'
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: 'js/[name].[hash:7].bundle.js',
    path: path.resolve(__dirname, '..', 'product'),
    publicPath: '/'
  },
  mode: 'development'
})