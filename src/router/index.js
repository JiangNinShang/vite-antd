import {
	createRouter,
	createWebHistory
} from "vue-router";
// 路由信息
const routes = [
	{
		path: '/main',
		name: 'main',
		component: () => import('@/components/HelloWorld.vue')
	},
	{
		path: '/',
		name: 'login',
		component: () => import('@/views/login.vue')
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/home.vue')
	},
	{
		path: '/main',
		name: 'main',
		component: () => import('@/views/main.vue')
	}
];

// 导出路由
const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
