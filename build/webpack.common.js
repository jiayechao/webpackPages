
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const glob = require('glob');
const srcDir = path.resolve(process.cwd(), "src");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var entries = function(){
    const jsDir = path.resolve(srcDir, 'entries');
    let entryFiles = glob.sync(jsDir + '/**/*.{js,jsx}')
    let map = {};
    for(let i = 0; i<entryFiles.length; i++){
        let filepath = entryFiles[i];
        let filename = filepath.substring(filepath.lastIndexOf('\/') + 1,filepath.lastIndexOf('.'))
        let foldername = filepath.substring(filepath.lastIndexOf('\/',filepath.lastIndexOf('\/')-1) + 1,filepath.lastIndexOf('\/'));
        if(foldername !== 'pages'){
            map[foldername+'_'+filename] = filepath
        }
    }
    return map;
}

var htmlplugins = function(config){
    const pageDir = path.resolve(srcDir, 'pages');
    let entryFiles = glob.sync(pageDir + '/**/*.{html,art}')
    let map = [];
    for(let i = 0; i<entryFiles.length; i++){
        let filepath = entryFiles[i];
        let filename = filepath.substring(filepath.lastIndexOf('\/') + 1,filepath.lastIndexOf('.'));
        let foldername = filepath.substring(filepath.lastIndexOf('\/',filepath.lastIndexOf('\/')-1) + 1,filepath.lastIndexOf('\/'));
        let fileSuffix = filepath.substring(filepath.lastIndexOf('\.') + 1);
        if(foldername !== 'pages'){
            config.plugins.push(new HtmlWebpackPlugin({
                filename: foldername+'/'+filename + '.html',
                template: 'src/pages/'+foldername+'/'+filename+'.'+fileSuffix,
                chunks: [foldername+'_'+filename]
            }));
        }
    }
}

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const moduleConfig = {
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
                ]
              }
        ]
    },
    resolve:{
        extensions: ['.js', '.vue', '.json'],
        alias:{
            'vue$':'vue/dist/vue.js',
            '@': resolve('src')
        }
    },
    plugins: [
        // 添加jquery
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new VueLoaderPlugin()
    ]
};
htmlplugins(moduleConfig);
module.exports = moduleConfig;