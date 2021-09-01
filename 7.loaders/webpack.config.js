const path = require('path');
const HtmlWebapckPlugin = require('html-webpack-plugin');
// 加载本地loader
// const babelLoader = path.join(__dirname, './loaders/babel-loader.js');
module.exports = {
    mode: 'development',
    devtool: false,
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    // 查找loader
    resolveLoader: {
        modules: ['node_modules', path.join(__dirname, '7.loaders')]
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
            }]
        }]
    },
    plugins: [
        new HtmlWebapckPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
}