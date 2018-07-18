const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["es2015"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader
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
                    name: 'img/[name].[hash:7].[ext]',
                }
            },
            {
                loader: 'image-webpack-loader',
                options: {
                }
            },
        ]
    },
    ]
  },
  plugins: [
    // 清理dist目录
    new CleanWebpackPlugin(['product'], {
      root: path.resolve(__dirname, '..'),
    }),
    // css分离
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  ],
  // devtool: 'source-map',/
  mode: 'production'
})