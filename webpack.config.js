const path = require('path');
const HtmlWebapckPlugin = require('html-webpack-plugin');

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
    plugins: [
        new HtmlWebapckPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
}