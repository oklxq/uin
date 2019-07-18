const merge = require('webpack-merge');
const base = require('./base');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');

module.exports = merge(base, {
    mode: 'production',
    output: {
        filename: 'uin.js',
        library: 'uin',
        libraryExport: 'default',
        libraryTarget: 'umd',
    },
    module:{
        rules:[
            {
                test: /\.css/,
                use: [
                    MiniCssPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.scss/,
                use: [
                    MiniCssPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
        }
    },
    optimization: {
        minimizer: [new UglifyPlugin()],
    },
    plugins:[
        new MiniCssPlugin({
            filename: 'uin.css',
        }),
    ]
});