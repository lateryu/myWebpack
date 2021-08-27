### 相对于webpack默认导入导出common模块的
common在导入es6模块的时候的变化

1. 打包后多出 __webpack_require__.r 方法
```js
 __webpack_require__.r(__webpack_exports__);
__webpack_require__.r = (exports) => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    // 给模块添加Module标识
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  }
  // 给es模块添加__esModule 属性, 标识加载的是es6模块
  Object.defineProperty(exports, '__esModule', { value: true });
};
```

2.__webpack_require__.d 方法给模块添加get函数

```js
 __webpack_require__.d(__webpack_exports__, {
   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
   "title2": () => (title2)
 });
// 给__webpack_exports__ 添加 default/title2 的get函数
__webpack_require__.d = (exports, definition) => {
  for (var key in definition) {
    if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
      // 给模块添加get函数
      Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
    }
  }
};
```

3.__webpack_require__.o方法, 判断obj中是否有prop属性

```js
 __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
```

4. export default 和 export导出的区别

```js
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
```

