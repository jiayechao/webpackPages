
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const glob = require('glob');
const srcDir = path.resolve(process.cwd(), "src");
var entries = function(){
    const jsDir = path.resolve(srcDir, 'js');
    let entryFiles = glob.sync(jsDir + '/*.{js,jsx}')
    let map = {};
    for(let i = 0; i<entryFiles.length; i++){
        let filepath = entryFiles[i];
        let filename = filepath.substring(filepath.lastIndexOf('\/') + 1,filepath.lastIndexOf('.'))
        map[filename] = filepath
    }
    console.log(map)
    return map;
}

module.exports = {
    entry: entries(),
    module:{
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
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
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                        }
                    },
                ]
            },
            {
                test: /\.html$/,
                use: [ {
                  loader: 'html-loader',
                  options: {
                    minimize: true
                  }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        // 自动打包模板
        new HtmlWebpackPlugin({
            title: '新手指引',
            filename: 'extension.html',
            template: 'src/pages/extension.html',
            chunks: ['extension'],
            devServer: 'http://localhost:8081',
        }),
        new HtmlWebpackPlugin({
            title: '宣传推广',
            filename: 'propaganda.html',
            template: 'src/pages/propaganda.html',
            chunks: ['propaganda'],
            devServer: 'http://localhost:8081',
        })
    ],
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, '..', 'product')
    }
};