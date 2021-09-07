import {
	createStore
} from "vuex";
import user from "./user";
const store = createStore({
	modules: {
		user
	},
});

export function useStore() {
	return store;
}

export default store;
