const merge = require('webpack-merge');
const base = require('./base');
const HtmlPlugin = require('html-webpack-plugin');
module.exports = merge(base, {
    mode: 'development',
    output: {
        filename: 'uin.js',
        library: 'uin',
        libraryExport: 'default',
        libraryTarget: 'umd',
    },
    devServer: {
        port: 8099,
    },

    resolve: {
        alias:{
            vue: 'vue/dist/vue.js'
        },
    },
    plugins: [
        new HtmlPlugin({
            template: './src/index.html',
            inject: 'head'
        })
    ]
});