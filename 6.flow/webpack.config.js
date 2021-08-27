const path = require('path');
// const HtmlWebapckPlugin = require('html-webpack-plugin');
const InfoPlugin = require('./infoPlugin');

module.exports = {
    context: process.cwd(),
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new InfoPlugin(),
    ]
}