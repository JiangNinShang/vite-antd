const mutations = {
	SetUser(state, params) {
		 localStorage.setItem('user', JSON.stringify(params));
		 state.user = params;
	}
}
export default mutations
