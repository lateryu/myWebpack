 (() => { // webpackBootstrap webpack的启动方法
     var __webpack_modules__ = ({
         "./src/title.js":
             ((module) => {
                 const title = 'title 1';
                 module.exports = title;
             })
     });
     // 模块的缓存
     var __webpack_module_cache__ = {};

     // 实现基础commonJs的规范的require方法, 参数是模块iD
     function __webpack_require__(moduleId) {
         // 查询缓存, 如果有直接返回exports对象
         var cachedModule = __webpack_module_cache__[moduleId];
         if (cachedModule !== undefined) {
             return cachedModule.exports;
         }
         // 创建一个新的模块 保存在缓存
         var module = __webpack_module_cache__[moduleId] = {
             exports: {}
         };
         // 执行模块的方法 ./src/title.js: function
         __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

         // 返回导出对象
         return module.exports;
     }

     var __webpack_exports__ = {};
     (() => {
         const title = __webpack_require__("./src/title.js");
         const index = 'index';
         console.log(title);
         console.log(index);
     })();
 })();