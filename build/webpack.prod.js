
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const moduleConfig = merge(common, {
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
                    loader: 'css-loader',
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
                        name: 'imgs/[name].[hash:7].[ext]'
                    }
                },
                // {
                //     loader: 'image-webpack-loader'
                // }
            ]
          }
    ]
  },
  plugins: [
    // 清理dist目录
    new CleanWebpackPlugin(['product'], {
      root: path.resolve(__dirname, '..'),
    }),
    //压缩js，去掉console等
    new UglifyJSPlugin({
      uglifyOptions: {
          compress: {
              drop_console: true
          }
      }
    }),
    // css分离
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:7].css",
    })
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  output: {
    filename: 'js/[name].[hash:7].bundle.js',
    path: path.resolve(__dirname, '..', 'product'),
    publicPath: '/help/'
  },
  devtool: 'source-map',
  mode: 'production'
});

module.exports = moduleConfig;