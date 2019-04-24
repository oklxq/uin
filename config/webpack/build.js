const merge = require('webpack-merge');
const base = require('./base');
module.exports = merge(base, {
    mode: 'production',
    output: {
        filename: 'uin.js',
        library: 'uin',
        libraryExport: 'default',
        libraryTarget: 'umd',
    }
});