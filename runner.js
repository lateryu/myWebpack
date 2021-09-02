const path = require('path');
const fs = require('fs');
const { runLoader } = require('./loader-runder');
const loaDir = path.resolve(__dirname, 'loader');
const request = 'inline-loader1!inline-loader2!./index.js';
let inlineLoaders = request('!');
const resource = inlineLoaders.pop();
const resolveLoader = (loader) => path.resolve(loaDir, loader);
inlineLoaders = inlineLoaders.map(resolveLoader);

let rules = [{
    enfore: 'pre',
    test: /\.js$/,
    use: ['pre-loadder1', 'pre-loader2'],
}, {
    test: /\.js$/,
    use: ['normal-loadder1', 'normal-loader2'],
}, {
    enfore: 'post',
    test: /\.js$/,
    use: ['post-loadder1', 'post-loader2'],
}];

const preLoaders = [];
const postLoaders = [];
const normalLoaders = [];
for (let i = 0; i < rules.length; i++) {
    let rule = rules[i];
    if (rule.test.test(resource)) {
        if (rule.enfore === 'pre') {
            preLoaders.push(...rule.use);
        } else if (rule.enfore === 'post') {
            postLoaders.push(...rule.use);
        } else {
            normalLoaders.push(...rule.use);
        }
    }
}
preLoaders = preLoaders.map(preLoader);
postLoaders = postLoaders.map(postLoader);
normalLoaders = normalLoaders.map(normalLoader);

const loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders];

runLoader({
    resource: path.join(__dirname, resource),
    loaders,
    readResource: fs.readFile.bind(fs),
}, (err, result) => {
    console.log(err);
    console.log(result);
})