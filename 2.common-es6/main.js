 (() => { // webpackBootstrap
     var __webpack_modules__ = ({
         "./src/title.js":
             ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
                 "use strict";
                 __webpack_require__.r(__webpack_exports__);
                 // 默认导出会声明__WEBPACK_DEFAULT_EXPORT__, 并把导出结果挂载上面
                 // export直接赋值
                 const __WEBPACK_DEFAULT_EXPORT__ = (title = 'title 1');
                 const title2 = 'title 2';
                 __webpack_require__.d(__webpack_exports__, {
                     "default": () => (__WEBPACK_DEFAULT_EXPORT__),
                     "title2": () => (title2)
                 });
             })
     });
     var __webpack_module_cache__ = {};

     function __webpack_require__(moduleId) {
         var cachedModule = __webpack_module_cache__[moduleId];
         if (cachedModule !== undefined) {
             return cachedModule.exports;
         }
         var module = __webpack_module_cache__[moduleId] = {
             exports: {}
         };
         __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
         return module.exports;
     }

     // 给 模块 添加get函数
     (() => {
         __webpack_require__.d = (exports, definition) => {
             for (var key in definition) {
                 if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                     Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                 }
             }
         };
     })();

     // 判断obj中是否有prop属性
     (() => {
         __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
     })();

     // 给模块添加Module标识
     (() => {
         __webpack_require__.r = (exports) => {
             if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                 Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
             }
             // 给es模块添加__esModule 属性, 标识加载的是es6模块
             Object.defineProperty(exports, '__esModule', { value: true });
         };
     })();

     var __webpack_exports__ = {};
     (() => {
         const title = __webpack_require__( /*! ./title */ "./src/title.js");
         const index = 'index';
         console.log(title);
         console.log(index);
     })();

 })();