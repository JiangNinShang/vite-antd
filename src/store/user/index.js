// 导入 types.js 文件
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import state from './state'

export default {
	namespaced: true, //防止命名冲突
	state,
	getters,
	actions,
	mutations
}
