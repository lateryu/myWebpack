/**
 *  entries: true, // 入口
    modules: true, // 模块
    chunks: true, // 代码块
    assets: true, // 文件
 */
const fs = require('fs');
const path = require('path');
const { SyncHook } = require('tapable');
class Compiler {
    constructor(config) {
        this.config = config
        this.hooks = {
            emit: new SyncHook(['assets']),
        };
    }
    run() {
        let entries = []; // 保存所有入口
        let modules = []; // 保存所有模块
        let chunks = [];
        let assets = {}; // key: 文件名, value: 文件内容
        let files = [];
        // 5. 根据配置中entry找出所有入口文件
        let entry = path.join(this.config.context, this.config.entry);
        entries.push(entry);
        // 编译模块: 从入口文件触发, 调用所有配置的loder对模块进行转移
        // 1. 先读取模块的内容
        let entryContent = fs.readFileSync(entry, 'utf8');
        let entrySource = babelLoader(entryContent);
        let entryModule = { id: './src/index.js', source: entrySource, name: 'main' };
        modules.push(entryModule);
        // 先把entryModule变成抽象语法树, 然后周到里面的依赖,
        // 递归的编译所有的模块
        let cssPath = path.join(this.config.context, './index.css');
        let cssContent = fs.readFileSync(cssPath, 'utf8');
        let cssSource = cssLoader(cssContent);
        let cssModele = { id: './index.css', source: cssSource, name: 'main' };
        modules.push(cssModele);

        // 6. 输出资源: 根据入口和模块之间的依赖关系, 组成一个个包含多个模块的chunk
        let chunk = { id: 'main', modules: [entryModule, cssModele] }
        chunks.push(chunk);
        // 7. 再把每个chunk转换成一个单独的文件加入输出列表,这是可以修改文件内容的最后机会

        for (let chunk of chunks) {
            // 编译的文件 
            assets[chunk.id + '.js'] = `(function(modules) {
            return __webpack_require__("./index.js");
          })({
            "./index.js": (function(module, exports){
              console.log('index');
            })
          })`
        }
        this.hooks.emit.call(assets);
        files = Object.keys(assets); // 写入硬盘的文件名称数组
        for (let file in assets) {
            debugger
            let filePath = path.join(this.config.output.path, file);

            fs.writeFileSync(filePath, assets[file]);
        }
    }
}

// loader
function babelLoader(source) {
    return `let sum = function(a,b){return {a+b}}require ('./index.css);`
}
// cssLoader
function cssLoader(source) {
    return `
      let style = document.createElement('style');
      style.innerHTML = 'body{backgroud-color: 'red'}';
      document.head.appendChild(style);
    `;
}

// 1. 初始化参数
let config = require('./webpack.config');
// 2. 开始编译
let compiler = new Compiler(config);
// 3. 加载所有配置的插件
for (let plugin of config.plugins) {
    plugin.apply(compiler);
}
// 4. 执行compiler的run方法
compiler.run();