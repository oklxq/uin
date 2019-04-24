const MiniCssPlugin = require('mini-css-extract-plugin');
const {VueLoaderPlugin} = require('vue-loader');
module.exports = {
    entry: './src/index.js',

    module: {
        rules: [
            {
                test: /\.scss/,
                use: [
                    MiniCssPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
        }
    },
    plugins: [
        new MiniCssPlugin({
            filename: 'uin.css',
        }),
        new VueLoaderPlugin(),
    ]
};
