
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const glob = require('glob');
const srcDir = path.resolve(process.cwd(), "src");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
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

var htmlplugins = function(config){
    const pageDir = path.resolve(srcDir, 'pages');
    let entryFiles = glob.sync(pageDir + '/*.{html,art}')
    let map = [];
    for(let i = 0; i<entryFiles.length; i++){
        let filepath = entryFiles[i];
        let filename = filepath.substring(filepath.lastIndexOf('\/') + 1,filepath.lastIndexOf('.'));
        let fileSuffix = filepath.substring(filepath.lastIndexOf('\.') + 1);
        config.plugins.push(new HtmlWebpackPlugin({
            filename: filename + '.html',
            template: 'src/pages/'+filename+'.'+fileSuffix,
            chunks: [filename]
        }));
    }
}

const config = {
    entry: entries(),
    module:{
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {loader: 'vue-loader'}
                ]
            },
            {
                test: /\.art$/,
                use: [
                    {loader: "art-template-loader"}
                ]
                
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'vue-style-loader'
                    },
                    {loader: 'css-loader'},
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: '.postcssrc.js'
                            }
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
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'fonts/[name].[hash:7].[ext]'
                        }
                    }
                ],
                
            }
        ]
    },
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    },
    plugins: [
        // 添加jquery
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new VueLoaderPlugin(),
    ],
    output: {
        filename: 'js/[name].[hash:7].bundle.js',
        path: path.resolve(__dirname, '..', 'product')
    }
};
htmlplugins(config);
module.exports = config;