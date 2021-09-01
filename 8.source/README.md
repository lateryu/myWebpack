#### 配置项
1. source-map: 生成source-map文件
2. eval: 使用evel包裹代码块
3. cheap: 不包含列信息
4. module: 包含loader的sourceMap(比如jsx => js), 否则无法定义源文件
5. inline: 将.map作为DataURI嵌入, 不单独生成.map文件

### 开发环境:
要求: 快(eval), 全(module),不在意代码列的信息(cheap)
devtool: cheap-module-eval-source-map

### 生产环境
要求: 不应该提供source-map给浏览器, 但是又需要source-map来定义错误信息,
作用: 一方面会生成sourcemap文件以提供给错误搜集工具比如(sentry), 另一方面不会为bundle添加引用注释,以避免浏览器使用
devtool: hidden-source-map
