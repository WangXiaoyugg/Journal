# Journal

## 编程日记

### 2017年
#### 12月
- 18号,javascript的面向对象写法
1. 基于原型链的继承, prototype.js
2. 基于类的继承,class.js

- 19号，实现最简单的promise
1. Promise 是异步的
2. Promise 返回对象的then方法只是将成功任务或失败任务推入相应的队列
3. Promise 异步结束后状态由pending 变为 rejected 或者 resolved
4. Promise 会执行相应状态的任务队列，最终返回结果

- 20号，实现一个简单的柯里化函数 curry
1. 接受一个函数，柯里化这个函数
2. 每个参数返回一个函数
3. 直到最后一个参数才执行

- 21号，字符串去空,字符串模板浅析
1. [参考链接](https://imququ.com/post/bom-and-javascript-trim.html)
2. [字符串模板浅析](https://juejin.im/post/5a373e096fb9a044fc44d4c9)

- 22号 ，常用的内容展示
1. 单元行鼠标悬停提示
2. 表格hover效果，css也可以实现
3. 阅读大话数据结构 第三章-线性表

- 23号，学习JS高级程序
1. setTimeout 模拟 setInterval
2. 数组分块
3. 函数节流

- 24号，学习react-router的解析文章
1. react-router [参考资料](https://zhenhua-lee.github.io/react/history.html)
2. 使用构造函数生成一个正则表达式 - 正则表达式迷你书

- 29号，学习css
1. 制作一个圆形的头像上传
  - [错误的写法](http://js.jirengu.com/hafayeqefa/4/edit)
  - [正确的写法](http://js.jirengu.com/nucocuxego/2/edit)
2. 一个带有涟漪的按钮
  - [demo](http://js.jirengu.com/cilewopumo/7/edit)
3. 响应式布局
  - 隐藏 + 折行 + 自适应空间
  - rem/viewport/media query
  	1. viewport window.innerWidth 动态计算
  	2. rem  html{fontSize: 20px} 大的写在上面，小的写在下面，精确性很高的网站不适合
  	3. @media (max-width) 精准匹配
    
4. flex 布局
5. border-radius 
	- 圆角矩形
	- 圆形
	- 扇形/半圆
	- 一些奇怪的角角
6. vue 中的css
  - scoped
  - 随机属性



### 2018年
#### 1月

- 1号，学习canvas(todo)
- 2号，写简单html5 mp3 播放器

- 6号 ，学习linux 操作
  1. [useradd与adduser的区别](https://www.cnblogs.com/whitehorse/p/5847278.html)
  2. freeCodeCamp 基础算法练习
- 15号，
  1. 学习 你不知道javascript的 值和类型两章  
  2. 学习 你不知道的javascript 的原生函数 和 强制类型转换
- 17号,代码重构
  1. 原则
    - 易读性优先
    - 不要为了性能过度优化而牺牲代码可读性
    - 复杂性守恒，逻辑复杂，代码肯定也是复杂的，逻辑简单，代码也是简单的
  2. 程序猿三大难题
    - 变量命名
    - 缓存失效
    - 循环边界


#### 5月

- [css 常见面试题](https://funteas.com/topic/5ada8eac230d1e5e25e45b89)
- [canvas太阳系动画](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_animations)
- koa 入门学习
- http 学习
- microtask优先于macrotask, [理解 JavaScript 中的 macrotask 和 microtask](https://juejin.im/entry/58d4df3b5c497d0057eb99ff)
- [vscode doc](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)， [NodeJS debug](https://segmentfault.com/a/1190000009084576)
- [aflerd基本使用](https://www.jianshu.com/p/e9f3352c785f)
- [快来围观一下JavaScript的Proxy](https://juejin.im/post/5b09234d6fb9a07acf569905?utm_source=gold_browser_extension)
- 常见的排序算法实现
- mysql 安装流程及修改密码(root: admin)
- [vue父子，兄弟组件的生命周期](https://mp.weixin.qq.com/s/gn6Ls7W7sx9ITWyyQjUklA)

### 6月
- [linux 端口占用解决](https://blog.csdn.net/mingzznet/article/details/38345875)
- [linux 上传目录](http://www.cnblogs.com/no7dw/archive/2012/07/07/2580307.html)
- [pragma](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Pragma), 类似于cache-control:no-cache
- [30 HTTP headers](https://www.fastly.com/blog/headers-we-dont-want)
- [HTTP Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
- 自己实现一个简易版Koa
- 阅读器的翻译效果实现
- [chrome 控制台小技巧](https://coolshell.cn/articles/17634.html)
- [ES2018（ES9）的新特性](https://juejin.im/post/5b2a186cf265da596d04a648)
- [graphQL 参考资料](http://graphql.cn/code/#javascript)

#### 7月
- Python 小工具制作
- react 知识复习
  1. 生命周期
  2. jsx
  3. diff算法
  4. 组件系统，无状态组件
     - 无状态组件, [参考资料](https://juejin.im/entry/59a980306fb9a02485103d0b)
       1. 纯函数，整洁易读
       2. 无状态，无 this, 无需绑定
       3. 便于测试
       4. 性能高，使用函数调用的方式
       5. PureComponent 实现性能优化，让你少写
          shouldComponentUpdate(nextProps, nextState)的判断

  5. react-router 使用和语法
  6. redux 和 react-redux 语法，原理，使用场景
  7. redux 中间件原理，redux-sega
  8. rx.js 入门使用
  9. react 测试, react16新增API

- 数据库知识学习，mysql ,mongoDB, 选学


#### 3月
- NodeJs fs 模块的练习例子
- jsonp 库源码学习
- [postman中 form-data、x-www-form-urlencoded、raw、binary的区别](https://blog.csdn.net/ye1992/article/details/49998511)
- cookie库源码阅读
- getPort 库源码阅读
- image-to-canvas 源码阅读
- 30s-css 代码练习

