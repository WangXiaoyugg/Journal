import View from './components/view'
import Link from './components/link'

export let _Vue;

export function install (Vue) {
    // 插件被注册过，阻止重复注册
    if(install.installed && _Vue === Vue) return;
    install.installed = true;

    _Vue = Vue;

    const isDef = v => v !== undefined;

    // 这段逻辑不清楚， 主要是处理Router-View 组件
    const registerInstance = (vm, callVal) => {
        let i = vm.$options._parentNode
        if(isDef(i)&&isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
            i(vm, callVal)
        }
    }
    // 插件被使用，在vue，beforeCreate 和 destory 混入方法
    Vue.mixin({
        beforeCreate() {
            // 混入的逻辑不清楚
            // 如果传入的根组件的 router 存在 等同于 new Vue({router,})
            // 执行根组件的注册
            if(isDef(this.$options.router)) {
                this._routerRoot = this
                this._router = this.$options.router
                // 初始化路由
                this._router.init(this)
                // 再Vue 实例上定义响应式私有属性， _route, 路由对象上当前路径
                Vue.util.defineReactive(this, '_route', this._router.history.current);
            } else {
                // 如果父组件存在，直接执向父组件的this.$paraent._routerRoot
                // 再次执行Bar组件 和 Foo 组件 注册，支持嵌套，形成一条引用链，
                // 每个实例都可以通过 this.routerRoot 访问到 根组件上的任意属性和方法
                this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
            }
            // 注册实例
            registerInstance(this, this);
        },
        destroyed() {
            // 注册实例
            registerInstance(this)
        },
    })

    Object.defineProperty(Vue.prototype, "$router", {
        get() {
            return this._routerRoot._router
        }
    }) 

    Object.defineProperty(Vue.prototype, "$route", {
        get() {
            return this._routerRoot._route
        }
    }) 
    
    Vue.component("RouterView", View)
    Vue.component("RouterLink", Link)

    const strats = Vue.config.optionMergeStrategies

    strats.beforeRouteEnter = strats.beforeRouteLeave 
        = strats.beforeRouteUpate = strats.created;

}