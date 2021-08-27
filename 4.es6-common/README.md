
多出__webpack_require__.n方法

```js
 (() => {
         // 获取默认导出, 兼容esModules, common modules
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
```