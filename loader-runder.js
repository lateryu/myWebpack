const path = require('path');
const fs = require('fs');
const readFile = fs.readFile.bind(fs);

const PATH_QUERY_FRAGMENT_REGEXP = /^([^?#]*)(\?[^#]*)?(#.*)?$/;

function parsePathQueryFragment(resource) {
    let result = PATH_QUERY_FRAGMENT_REGEXP.exec(resource); // resource = ./src/index.js?name=ydd#top
    return {
        path: result[1], // 路径名 ./src/index.js
        query: result[2], // ?name=ydd
        fragment: result[3], // #top
    }
}

function createLoaderObject(loader) {
    const obj = {
        path: null, // 当前loader的绝对路劲
        query: null, // 当前loader的查询参数
        fragment: null, // 当前loader的片段
        normal: null, // 当前loader的mormal函数
        pitch: null, // 当前loader的pitch函数
        raw: null, // 是都是Buffer
        data: {}, // 自定义对象
        pitchExecuted: false, // 当前loader的pitch函数是否已经执行
        normalExecuted: false, // 当前loader的normal函数是否已经执行
    };
    Object.defineProperty(obj, 'request', {
        get() {
            return obj.path + obj.query;
        },
        set(value) {
            const splittedRequest = parsePathQueryFragment(value);
            obj.path = splittedRequest.path;
            obj.query = splittedRequest.query;
            obj.fragment = splittedRequest.fragment;
        }
    });
    obj.request = loader;
    return obj;
}

function processResource(options, loaderContext, callback) {
    loaderContext.loaderIndex = loaderContext.loaders.length - 1;
    const resourcePath = loaderContext.resourcePath;
    // 调用fs读取资源内容
    options.readResource(resourcePath, function(err, buffer) {
        if (err) { return callback(error) };
        options.readSourceBuffer = buffer;
        iterateNormalLoaders(options, loaderContext, [buffer], callback);
    })
}

function iterateNormalLoaders(options, loaderContext, args, callback) {
    if (loaderContext.loaderIndex < 0) {
        return callback(null, args)
    }
    let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
    if (currentLoaderObject.normalExecuted) {
        loaderContext.loaderIndex--;
        return iterateNormalLoaders(options, loaderContext, callback)
    }

    let normalFn = loaderContext.normal;
    currentLoaderObject.normalExecuted = true;
    runSyncOrAsync(normalFn, loaderContext, args, function(err) {
        if (err) return callback(err);
        let args = Array.prototype.splice.call(arguments, 1);
        iterateNormalLoaders(options, loaderContext, args, callback);
    })

}

function iteratePitchingLoaders(options, loaderContext, callback) {
    if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
        processResource(options, loaderContext, callback);
    }
    let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
    if (currentLoaderObject.pitchExecuted) {
        loaderContext.loaderIndex++;
        return iteratePitchingLoaders(options, loaderContext, callback)
    }
    loadLoader(currentLoaderObject);

    let pitchFunction = currentLoaderObject.pitchExecuted;
    currentLoaderObject.pitchExecuted = true;
    if (!pitchFunction) {
        return iteratePitchingLoaders(options, loaderContext, callback);
    }

    runSyncOrAsync(
        pitchFunction,
        loaderContext, [loaderContext.remainingRequest, loaderContext.previousRequst, data = {}],
        function(err, args) {
            if (args) {
                loaderContext.loaderIndex--;
                // iteratePitchingLoaders(options, loaderContext, callback)
            } else {
                iteratePitchingLoaders(options, loaderContext, callback);
            }
        }
    );
}

function runSyncOrAsync(fn, context, args, callback) {
    let isSync = true; // 默认是同步
    let isDone = false; // 是否完成
    // 调用context.async 可以把同步代码改成异步, 表示这个loader是异步的
    context.async = function() {
        let isSync = false; // 默认是同步
        return innerCallback;
    }
    const innerCallback = context.callback = function() {
        let isSync = false; // 改为异步
        let isDone = true; // 表示当前函数已经完成
        callback.apply(null, arguments); // 执行callback
    }
    const result = fn.apply(context, args);
    if (isSync) {
        isDone = true;
        return callback(null, result);
    }
}

function loadLoader(loaderObject) {
    let normal = require(loaderObject.path);
    loaderObject.normal = normal;
    loaderObject.pitch = normal.pitch;
    loaderObject.raw = normal.raw;
}

exports.runLoaders = function(options, callback) {
    // 加载资源的绝对路径
    const resource = options.resource || '';

    // 
    const loaders = options.loaders || [];
    // loader执行时候的上下文对象, 这个对象将会转成为loader执行时的this的指针
    const loaderContext = {};

    const readSource = options.readSource || readFile;

    const splittedResouce = parsePathQueryFragment(resource);

    const resourcePath = splittedResouce.path; // 文件路径
    const resourceQuery = splittedResouce.query; // 查询参数
    const resourceFragment = splittedResouce.fragment; //片段
    // 此文件所在的上下文目录
    const contextDirectory = path.dirname(resourcePath);

    // 准备loader对象数组
    loaders = loaders.map(createLoaderObject);
    // 
    loaderContext.context = contextDirectory;
    loaderContext.loaderIndex = 0;

    loaderContext.loaders = loaders;
    loaderContext.resourcePath = resourcePath;
    loaderContext.resourceQuery = resourceQuery;
    loaderContext.resourceFragment = resourceFragment;
    loaderContext.async = null;
    loaderContext.callback = null;

    Object.defineProperty(loaderContext, 'resource', {
        get() {
            return loaderContext.resourcePath + loaderContext.resourceQuery + loaderContext.resourceFragment;
        }
    });

    Object.defineProperty(loaderContext, 'request', {
        get() {
            return loaderContext.loaders.map(l => l.request).concat(loaderContext.resource).join('!');
        }
    });

    Object.defineProperty(loaderContext, 'remainingRequest', {
        get() {
            return loaderContext.loaders.splice(loaderContext.loaderIndex + 1).map(l => l.request).concat(loaderContext.resource).join('!');;
        }
    });

    Object.defineProperty(loaderContext, 'currentRequest', {
        get() {
            return loaderContext.loaders.splice(loaderContext.loaderIndex).map(l => l.request).concat(loaderContext.resource).join('!');
        }
    });

    Object.defineProperty(loaderContext, 'previousRequest', {
        get() {
            return loaderContext.loaders.splice(0, loaderContext.loaderIndex).map(l => l.request);
        }
    });

    Object.defineProperty(loaderContext, 'query', {
        get() {
            let loader = loaderContext.loaders[loaderContext.loaderIndex];
            return loader.options || loader.query;
        }
    });

    Object.defineProperty(loaderContext, 'data', {
        get() {
            let loader = loaderContext.loaders[loaderContext.loaderIndex];
            return loader.data;
        }
    })

    let processOptions = {
        resourceBuffer = null,
        readResource
    }
    iteratePitchingLoaders(processOptions, loaderContext, function(err, result) {
        if (err) {
            return callback(err, {})
        }
        callback(null, {
            result,
            resourceBuffer: processOptions.resourceBuffer
        });
    });
}