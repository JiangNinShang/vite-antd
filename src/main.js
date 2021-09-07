import {
	createApp
} from 'vue'
import App from './App.vue'
import antd from 'ant-design-vue'
import elementPlus from 'element-plus'
import 'ant-design-vue/dist/antd.css'
import 'element-plus/dist/index.css'
import store from './store'
import router from './router'
const app = createApp(App)
app.use(elementPlus)
app.use(antd)
app.use(router)
app.use(store)
app.mount('#app')
