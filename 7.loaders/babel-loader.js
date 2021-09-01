const babel = require('@babel/core');
// 在loder执行的时候, this会指向loaderContext对象, 它上面有个callback方法
function loader(source) {
    console.log('------------------ loader --------------------');
    const option = {
        presets: ['@babel/preset-env'], // 配置预设, 是一个插件包
        sourceMap: true, // 生产sourceMap文件, 才可以调试源码
        // 对应哪个文件的源代码, 不配置时,获取不到对应的文件名称
        filename: this.resource.split('/').pop(),
    };
    // 转换成es5语法, 新的source-map文件, ast抽象语法树
    // 如果babel转换后提供了ast抽象语法树, 那么webpack会直接使用这个loader提供的抽象
    // 语法树
    const { code, map, ast } = babel.transform(source, option);

    return this.callback(null, code, map, ast);
}
module.exports = loader;