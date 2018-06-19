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
    ]
  },
  plugins: [
    // 清理dist目录
    new CleanWebpackPlugin(['product'], {
      root: path.resolve(__dirname, '..'),
    }),
    // css分离
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    })
  ],
  // devtool: 'source-map',/
  mode: 'production'
})