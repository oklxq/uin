const merge = require('webpack-merge');
const base = require('./base');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
module.exports = merge(base, {
    mode: 'production',
    output: {
        filename: 'uin.js',
        library: 'uin',
        libraryExport: 'default',
        libraryTarget: 'umd',
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
    }
});