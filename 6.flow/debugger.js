const webpack = require('webpack');

const options = require('./webpack.config');

const compiler = webpack(options);

// compiler编译器, 调用run方法开始编译
compiler.run((err, stats) => {
    console.log(err);
    console.log(stats.toJson({
        entries: true, // 入口
        chunks: true, // 代码块
        modules: true, // 产生的模块
        assets: true, //  产生资源
        files: true, // 产生的文件
    }));
})