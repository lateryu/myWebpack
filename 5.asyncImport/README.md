
1. 异步加载(都是es模块的时候)
* 增加__webpack_require__.e方法
```js
  __webpack_require__.f = {};
        __webpack_require__.e = (chunkId) => {
            return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
                __webpack_require__.f[key](chunkId, promises);
                return promises;
            }, []));
        };
```


2. 当存在加载common模块的时候,存咋__webpack_require__.t
```js
 __webpack_require__.t = function(value, mode) {
            if (mode & 1) value = this(value);
            if (mode & 8) return value;
            if (typeof value === 'object' && value) {
                if ((mode & 4) && value.__esModule) return value;
                if ((mode & 16) && typeof value.then === 'function') return value;
            }
            var ns = Object.create(null);
            __webpack_require__.r(ns);
            var def = {};
            leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
            for (var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
                Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
            }
            def['default'] = () => (value);
            __webpack_require__.d(ns, def);
            return ns;
        };

```