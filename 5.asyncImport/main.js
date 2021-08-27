(() => { // webpackBootstrap
    var __webpack_modules__ = ({});
    // The module cache
    var __webpack_module_cache__ = {};

    // The require function
    function __webpack_require__(moduleId) {
        // Check if module is in cache
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

    __webpack_require__.m = __webpack_modules__;
    (() => {
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                }
            }
        };
    })();

    // __webpack_require__.e
    (() => {
        __webpack_require__.f = {};
        __webpack_require__.e = (chunkId) => {
            return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
                __webpack_require__.f[key](chunkId, promises);
                return promises;
            }, []));
        };
    })();

    (() => {
        __webpack_require__.u = (chunkId) => {
            return "" + chunkId + ".js";
        };
    })();

    (() => {
        __webpack_require__.g = (function() {
            if (typeof globalThis === 'object') return globalThis;
            try {
                return this || new Function('return this')();
            } catch (e) {
                if (typeof window === 'object') return window;
            }
        })();
    })();

    (() => {
        __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
    })();

    (() => {
        var inProgress = {};
        var dataWebpackPrefix = "mywebpack:";
        // src_title_js 的路径, loadingEnded, chunk-src_title_js, src_title_js
        // 生成 script标签并插入页面
        __webpack_require__.l = (url, done, key, chunkId) => {
            // 第一次加载false
            if (inProgress[url]) { inProgress[url].push(done); return; }

            var script, needAttach;
            if (key !== undefined) {
                var scripts = document.getElementsByTagName("script");
                for (var i = 0; i < scripts.length; i++) {
                    var s = scripts[i];
                    if (s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
                }
            }
            if (!script) {
                needAttach = true;
                script = document.createElement('script');

                script.charset = 'utf-8';
                script.timeout = 120;
                if (__webpack_require__.nc) {
                    script.setAttribute("nonce", __webpack_require__.nc);
                }
                script.setAttribute("data-webpack", dataWebpackPrefix + key);
                script.src = url;
            }
            inProgress[url] = [done];
            var onScriptComplete = (prev, event) => {
                // avoid mem leaks in IE.
                script.onerror = script.onload = null;
                clearTimeout(timeout);
                var doneFns = inProgress[url];
                delete inProgress[url];
                script.parentNode && script.parentNode.removeChild(script);
                doneFns && doneFns.forEach((fn) => (fn(event)));
                if (prev) return prev(event);
            };
            var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
            script.onerror = onScriptComplete.bind(null, script.onerror);
            script.onload = onScriptComplete.bind(null, script.onload);
            needAttach && document.head.appendChild(script);
        };
    })();

    (() => {
        __webpack_require__.r = (exports) => {
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            }
            Object.defineProperty(exports, '__esModule', { value: true });
        };
    })();

    // 脚本加载路径
    (() => {
        var scriptUrl;
        if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
        var document = __webpack_require__.g.document;
        if (!scriptUrl && document) {
            if (document.currentScript)
                scriptUrl = document.currentScript.src
            if (!scriptUrl) {
                var scripts = document.getElementsByTagName("script");
                if (scripts.length) scriptUrl = scripts[scripts.length - 1].src
            }
        }
        if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
        scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
        __webpack_require__.p = scriptUrl;
    })();

    (() => {
        // 存放加载过的,和加载中的代码块
        // undefined 标识未加载
        // 0 标识加载成功
        // null 表示预加载或预获取
        // promise 表示正在加载中
        var installedChunks = {
            "main": 0
        };

        __webpack_require__.f.j = (chunkId, promises) => {
            // 判断installedChunks 是否 有当前模块,有的话直接获取, 没有则赋值undefined
            var installedChunkData =
                __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
            if (installedChunkData !== 0) { // 第一次加载undefined不等于0
                if (installedChunkData) {
                    promises.push(installedChunkData[2]);
                } else {
                    if (true) {
                        // 在代码块缓存中设置Promise 
                        // installedChunkData = [resolve, reject]
                        var promise =
                            new Promise((resolve, reject) =>
                                (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
                        // installedChunkData[2] = promise 
                        // installedChunkData = [resolve, reject, promise]
                        // promises.push(promises)
                        promises.push(installedChunkData[2] = promise);
                        // 执行后, installedChunks = {main: 0, src_title_js: [resolve, reject, promise]}

                        // 获取src_title_js 的路径
                        var url = __webpack_require__.p + __webpack_require__.u(chunkId);
                        var error = new Error();
                        var loadingEnded = (event) => {
                            if (__webpack_require__.o(installedChunks, chunkId)) {
                                installedChunkData = installedChunks[chunkId];
                                if (installedChunkData !== 0) installedChunks[chunkId] = undefined;
                                if (installedChunkData) {
                                    var errorType = event && (event.type === 'load' ? 'missing' : event.type);
                                    var realSrc = event && event.target && event.target.src;
                                    error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
                                    error.name = 'ChunkLoadError';
                                    error.type = errorType;
                                    error.request = realSrc;
                                    installedChunkData[1](error);
                                }
                            }
                        };
                        // src_title_js 的路径, loadingEnded, chunk-src_title_js, src_title_js
                        __webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
                    } else installedChunks[chunkId] = 0;
                }
            }
        };
        // 改写chunkLoadingGlobal 数组的push方法
        var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
            var [chunkIds, moreModules, runtime] = data;
            // add "moreModules" to the modules object,
            // then flag all "chunkIds" as loaded and fire callback
            var moduleId, chunkId, i = 0;
            if (chunkIds.some((id) => (installedChunks[id] !== 0))) {
                for (moduleId in moreModules) {
                    if (__webpack_require__.o(moreModules, moduleId)) {
                        // 把异步加载的模块id合并到 __webpack_require__.module上
                        __webpack_require__.m[moduleId] = moreModules[moduleId];
                    }
                }
                if (runtime) var result = runtime(__webpack_require__);
            }
            if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
            for (; i < chunkIds.length; i++) {
                chunkId = chunkIds[i];
                if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
                    installedChunks[chunkId][0]();
                }
                installedChunks[chunkIds[i]] = 0;
            }
        }

        var chunkLoadingGlobal = self["webpackChunkmywebpack"] = self["webpackChunkmywebpack"] || [];
        chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
        chunkLoadingGlobal.push =
            webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
    })();

    var __webpack_exports__ = {};
    __webpack_require__.e("src_title_js")
        // __webpack_require__函数作为.then的resol方法
        .then(__webpack_require__.bind(__webpack_require__, "./src/title.js"))
        .then((re) => {
            console.log(re);
        })
})();