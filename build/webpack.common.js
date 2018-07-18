
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
        if(filename !== 'jquery'){
            map[filename] = filepath
        }
    }
    console.log(map)
    return map;
}


module.exports = {
    entry: entries(),
    module:{
        rules: [
            {
                test: /\.art$/,
                loader: "art-template-loader",
            },
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
        // 添加jquery
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        // 自动打包模板
        new HtmlWebpackPlugin({
            title: '新手指引',
            filename: 'extension.html',
            template: 'src/pages/extension.html',
            chunks: ['extension']
        }),
        new HtmlWebpackPlugin({
            title: '宣传推广',
            filename: 'propaganda.html',
            template: 'src/pages/propaganda.html',
            chunks: ['propaganda']
        }),
        new HtmlWebpackPlugin({
            title: 'delc糖果',
            filename: 'delclogin.html',
            template: 'src/pages/delclogin.art',
            chunks: ['delccommon', 'delclogin']
        }),
        new HtmlWebpackPlugin({
            title: '糖果领取',
            filename: 'delcsugar.html',
            template: 'src/pages/delcsugar.art',
            chunks: ['delccommon', 'delcsugar']
        }),
        new HtmlWebpackPlugin({
            title: '糖果领取详情',
            filename: 'delcdetail.html',
            template: 'src/pages/delcdetail.art',
            chunks: ['delccommon', 'delcdetail']
        }),
        new HtmlWebpackPlugin({
            title: '糖果领取',
            filename: 'delcget.html',
            template: 'src/pages/delcget.art',
            chunks: ['delccommon', 'delcget']
        }),
        new HtmlWebpackPlugin({
            title: 'tokenworld下载',
            filename: 'delcdownload.html',
            template: 'src/pages/delcdownload.art',
            chunks: ['delccommon', 'delcdownload']
        }),
        new HtmlWebpackPlugin({
            title: '猎盟币复利',
            filename: 'compoundInterest.html',
            template: 'src/pages/compoundInterest.html',
            chunks: ['compoundInterest']
        })
    ],
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, '..', 'product')
    }
};