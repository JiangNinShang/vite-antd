import {
	createRouter,
	createWebHistory
} from "vue-router";
// 路由信息
const routes = [
	{
		path: '/',
		name: '登录',
		component: () => import('@/views/login.vue')
	},
	{
		path: '/home',
		name: '主页',
		component: () => import('@/views/home.vue')
	},
];

// 导出路由
const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
