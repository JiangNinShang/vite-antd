import api from '@/store/user/api.js'
const actions = {
	login({
		commit
	}, value) {
		 return api.login(value)
	}
}
export default actions
