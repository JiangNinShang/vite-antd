<template>
	<div id="app">
		<div style="width: 256px">
			<a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
				<a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
			</a-button>
			<a-menu :defaultSelectedKeys="[$route.path]" :openKeys="openKeys" mode="inline" theme="dark"
				:inline-collapsed="collapsed" @openChange="onOpenChange" @click="menuClick">
				<template v-for="item in list">
					<a-menu-item v-if="!item.children" :key="item.path">
						<a-icon type="pie-chart" />
						<span>{{ item.title }}</span>
					</a-menu-item>
					<sub-menu v-else :key="item.path" :menu-info="item" />
				</template>
			</a-menu>
		</div>
		<router-view />
	</div>
</template>

<script>
	import {
		Menu
	} from 'ant-design-vue';
	import {
		defineComponent,
		ref
	} from 'vue';
	import {
		MenuFoldOutlined,
		MenuUnfoldOutlined,
		PieChartOutlined,
		MailOutlined,
	} from '@ant-design/icons-vue';
	const SubMenu = {
		template: `
      <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.path">
            <a-icon type="pie-chart" />
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
		name: 'SubMenu',
		// must add isSubMenu: true 此项必须被定义
		isSubMenu: true,
		props: {
			// 解构a-sub-menu的属性，也就是文章开头提到的为什么使用函数式组件
			...Menu.SubMenu.props,
			// Cannot overlap with properties within Menu.SubMenu.props
			menuInfo: {
				type: Object,
				default: () => ({}),
			},
		},
		components: {
			MenuFoldOutlined,
			MenuUnfoldOutlined,
			PieChartOutlined,
			MailOutlined,
		},
	};

	export default {
		name: "App",
		components: {
			'sub-menu': SubMenu,
			MenuFoldOutlined,
			MenuUnfoldOutlined,
			PieChartOutlined,
			MailOutlined,
		},
		data() {
			return {
				collapsed: false,
				openKeys: [],
				rootSubmenuKeys: ['/user'],
				list: [{
						key: '1',
						title: '信息管理',
						path: '/info',
					},
					{
						key: '2',
						title: '用户管理',
						path: '/user',
						children: [{
								key: '2.1',
								title: '后台用户',
								path: '/adminUser',
								children: [{
									key: '2.1.1',
									title: '新增用户',
									path: '/addAdminUser',
									children: [{
										key: '2.1.1。1',
										title: '用户xx',
										path: '/addAdminUserXX',
									}]
								}]
							},
							{
								key: '2.2',
								title: '前台用户',
								path: '/frontUser',
							}
						]
					}
				],
			};
		},
		created() {
			const openKeys = window.sessionStorage.getItem('openKeys')
			if (openKeys) {
				this.openKeys = JSON.parse(openKeys)
			}
		},
		methods: {
			toggleCollapsed() {
				this.collapsed = !this.collapsed;
			},
			onOpenChange(openKeys) {
				// 将当前打开的父级菜单存入缓存中
				window.sessionStorage.setItem('openKeys', JSON.stringify(openKeys))
				//  控制只打开一个
				const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
				if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
					this.openKeys = openKeys;
				} else {
					this.openKeys = latestOpenKey ? [latestOpenKey] : [];
				}
			},
			menuClick({
				key
			}) {
				// 获取到当前的key,并且跳转
				this.$router.push({
					path: key
				})
			},
		}
	};
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		padding: 50px;
	}
</style>
