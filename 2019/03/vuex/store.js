import applyMixin from './mixin'
import devtoolPlugin from './plugins/devtool'
import ModuleCollection from './module/module-collection'
import {forEachValue, isObject, isPromise, assert, partail} from './util'

let Vue; // 在安装时绑定

export class Store {
	constructor(options = {}) {

	}

	get state(v) {

	}

	set state(v) {

	}

	commit(_type, _payload, _options) {

	}

	dispatch(_type, _payload) {

	}

	subscribe(fn) {

	}

	subscribeAction(fn) {

	}

	watch(getter, cb, options) {

	}

	replaceState(state) {

	}

	registerModule(path, rawModule, options = {}) {

	}

	unregisterModule(path) {

	}		

	hotUpdate(newOptions) {

	}

	_withCommit(fn) {

	}

}

function genericSubscribe (fn, subs) {
	
}

function resetStore (store, hot) {
	
}

function resetStoreVm (store, state, hot) {
		
}

function installModule(store, rootState, path, module, hot) {

}	

function makeLocalContext (store, namespace, path) {
	
}

function makeLocalGetters (store, namespace) {
	
}

function registerMutation (store, type, handler, local) {
	
}

function registerAction (store, type, handler, local) {
	
}

function registerGetter (store, type, rawGetter, local) {
	
}

function enableStrictMode (store) {
	 
}

function getNestedState (state, path) {
	
}

function unifyObjectStyle (type, payload, options) {
	
}

export function install (_Vue) {
	// 传入的_Vue对象和Vue 相同，并且在开发环境，提示用户不能重复使用Vue.use(Vuex)
	// 有点单例模式的味道
	// 第一次初始化，把传入的_Vue赋值给Vue, 执行applyMixin 混入
	if(Vue && _Vue === Vue) {
		if(process.env.NODE_ENV !== 'production') {
			console.error(
				'[vuex] already installed, Vue.use(Vuex) should be called once.'
			)
		}
		return;
	}
	Vue = _Vue;
	applyMixin(Vue);
}