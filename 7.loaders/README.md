#### 加载本地loader

### loader的类型
* pre: 前置
* normal: 普通
* inline: 内联
* post: 后置

> 执行顺序: pre - nolmal - inline - post

### 特殊配置


| 符号 | 变量 | 含义 |  
|  ----  | ----  | --- |
| -! | noPreAutoLoaders | 不要前置和普通的loader |
| ! | noAutoLoaders | 不要普通的loader |
| !! | noPrePOstAutoLoaders | 不要后置和前置和普通的loader, 只要内内联loader |

### pitch
* 比如: a!b!c!module, 正常的调用顺序是从,c,b,a, 但是真正的调用顺序是a(pitch), b(pitch), c(pitch), c, b, a, 如果期中任何一个pitching的loader有返回值,就相当于在他以及他右边的loader""已经执行完毕
* 如果b返回字符串"result b", 接下来只有a会被系统执行, 切a的loader收到的参数是"result b"
* loader根据返回值可以分为两种, 一种是返回的js代码(一个js代码,含有modules.export语句),
还有不能作为最左边loader的其他loader
