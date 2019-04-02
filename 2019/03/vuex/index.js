// 引入 全局的Store, install 安装方法
import {Store, install} from './store'
// 常用的API 其实 helpers 文件导出的函数
import {mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers} from './helpers'

export default {
	Store,
	install,
	version: "__VERSION__",
	mapState,
	mapMutations,
	mapGetters,
	mapActions,
	createNamespacedHelpers,
}