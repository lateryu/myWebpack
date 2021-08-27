const webpack = require('webpack');

const options = require('./webpack.config');

const compiler = webpack(options);

// compiler编译器, 调用run方法开始编译
compiler.run((err, stats) => {
    console.log(err);
    console.log(stats.toJson({
        entries: true,
        chunks: true,
        modules: true,
        assets: true,
    }));
})