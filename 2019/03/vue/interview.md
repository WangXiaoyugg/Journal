# Vue 面试题

1. 什么是Vue.js?
Vue 是一套开源的，用于构建用户界面的渐进式框架，核心库只关注视图层，易于上手，便于与第三方库和既有的项目整合

2. Vue.js 的主要特征有哪些？
  虚拟DOM, 组件化，模版，路由，轻量体积小

3. Vue.js的生命周期有哪些?
![Vue生命周期](https://cn.vuejs.org/images/lifecycle.png)

init 阶段: beforeCreate, created, 支持客户端和服务端渲染，
mounting 阶段: beforeMount, mounted, mounted用于获取数据
updating 阶段：beforeUpdate, updated
destruction 阶段： beforeDestroy, destroyed, 用于清理事件绑定，以及发送统计

生命周期的使用场景，父子组件中同名生命周期挂载顺序

4. 条件指令是什么？
v-if v-else 
