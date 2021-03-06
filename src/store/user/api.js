import axios from "@/http/axios.js"
const TIMEOUT = 6000
//请求示例
//get
export const users = () => {
	return Promise.resolve(axios({
		url: "/api/users",
		method: "GET",
		config: {
			headers: {
				'Request-Type': 'wechat'
			},
			timeout: TIMEOUT
		}
	}))
}
//post
export const login = (data) => {
	return Promise.resolve(axios({
		url: "/api/user/login",
		method: "POST",
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
	users
}
