 (() => { // webpackBootstrap
     var __webpack_modules__ = ({
         "./src/title.js":
             ((module) => {
                 module.exports = {
                     name: 'title_name',
                     age: 'title_age'
                 }
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

     (() => {
         // 获取默认导出, 兼容esModules, common modules
         // 参数modules不是模块, 而是__webpack_require__函数的导出对象 module.exports
         __webpack_require__.n = (module) => {
             var getter = module && module.__esModule ?
                 // 如果是es6 模块会把导出挂在导出对象的default属性上
                 () => (module['default']) :
                 // 如果是common 直接导出对象
                 () => (module);
             // 给getter函数定义一个a属性, 属性的getter方法是 获取值的getter本身
             __webpack_require__.d(getter, { a: getter });
             return getter;
         };
     })();

     (() => {
         __webpack_require__.d = (exports, definition) => {
             for (var key in definition) {
                 if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                     Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                 }
             }
         };
     })();

     (() => {
         __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
     })();

     (() => {
         __webpack_require__.r = (exports) => {
             if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                 Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
             }
             Object.defineProperty(exports, '__esModule', { value: true });
         };
     })();

     var __webpack_exports__ = {};
     (() => {
         "use strict";
         __webpack_require__.r(__webpack_exports__);
         var _title__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/title.js");
         // __webpack_require__.n返回的是getter函数
         var _title__WEBPACK_IMPORTED_MODULE_0___default =
             __webpack_require__.n(_title__WEBPACK_IMPORTED_MODULE_0__);
         const index = 'index';
         console.log((_title__WEBPACK_IMPORTED_MODULE_0___default() b.name));
         console.log((_title__WEBPACK_IMPORTED_MODULE_0___default().age));
         console.log(index);
     })();
 })();