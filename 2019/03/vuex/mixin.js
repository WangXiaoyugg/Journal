export default function (Vue) {
	const version = Number(Vue.version.split('.')[0]);
	//获取当前的大版本号， V2/V1
	
	if(version >= 2) {
		Vue.mixin({beforeCreate: vuexInit})
	} else {
	// override init and inject vuex init procedure
    // for 1.x backwards compatibility.
		const _init = Vue.prototype._init
		Vue.prototype._init = function  (options={}) {
			options.init = options.init
				? [vuexInit].concat(options.init)
				: vuexInit
		}
		_init.call(this, options);
	}

	// 在初始化钩子列表时注入每一个实例
	// 全局混入对象
	function  vuexInit() {
		const options = this.$options;
		// 注入store
		if(options.store) {

			this.$store = typeof options.store === 'function'
				? options.store()
				: options.store

		// 为什么要访问parent? 给每个 vue 组件都添加了 $store 属性		
		} else if(options.parent && options.parent.$store){
			this.$store = options.parent.$store;
		}
	}
}