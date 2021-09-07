import axios from "@/http/axios.js"
const TIMEOUT = 6000
//请求示例
//get
export const getUser = (data) => {
	return axios({
		url: "api/user/getUser",
		method: "get",
		data,
		config: {
			headers: {
				'Request-Type': 'wechat'
			},
			timeout: TIMEOUT
		}
	})
}
//post
export const login = (data) => {
	return Promise.resolve(axios({
		url: "api/user/login",
		method: "post",
		data,
		config: {
			headers: {
				'Request-Type': 'wechat'
			},
			timeout: TIMEOUT
		}
	}))
}
export default {
	login,
	getUser
}
