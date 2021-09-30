import {
	createRouter,
	createWebHistory
} from "vue-router";
// 路由信息
const routes = [{
		path: '/:pathMatch(.*)*', // 页面不存在的情况下会跳到404页面
		redirect: '/404',
		name: 'notFound',
		hidden: true
	}, {
		path: '/login',
		name: '登录',
		component: () => import('@/views/login.vue')
	},
	// {
	// 	path: '/home',
	// 	name: '主页',
	// 	component: () => import('@/views/home.vue')
	// },
	{
		path: '/404',
		name: 'page404',
		component: () => import('@/errorPage/404.vue')
	},
	{
		path: '/',
		name: '主页',
		component: () => import('@/components/file.vue')
	}
];

// 导出路由
const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
