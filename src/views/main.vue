<template>
	<a-layout style="min-height: 100vh">
		<a-layout-sider v-model:collapsed="collapsed" collapsible>
			<div class="logo">
				<font color="red">我是个logo</font>
			</div>
			<a-menu :default-selected-keys="['1']" :default-open-keys="['2']" mode="inline" theme="dark"
				:inline-collapsed="collapsed">
				<template v-for="item in list" :key="item.key">
					<template v-if="!item.children">
						<a-menu-item :key="item.key">
							<template #icon>
								<PieChartOutlined />
							</template>
							{{ item.title }}
						</a-menu-item>
					</template>
					<template v-else>
						<sub-menu :menu-info="item" :key="item.key" />
					</template>
				</template>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<a-layout-header style="background: #fff; padding: 0" />
			<a-layout-content style="margin: 0 16px">
				<a-breadcrumb style="margin: 16px 0">
					<a-breadcrumb-item>User</a-breadcrumb-item>
					<a-breadcrumb-item>Bill</a-breadcrumb-item>
				</a-breadcrumb>
				<div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
					Bill is a cat.
				</div>
			</a-layout-content>
			<a-layout-footer style="text-align: center">
				Ant Design ©2018 Created by Ant UED
			</a-layout-footer>
		</a-layout>
	</a-layout>
</template>

<style>
	#components-layout-demo-side .logo {
		height: 32px;
		margin: 16px;
		background: rgba(255, 255, 255, 0.3);
	}

	.site-layout .site-layout-background {
		background: #fff;
	}

	[data-theme='dark'] .site-layout .site-layout-background {
		background: #141414;
	}

	.logo {
		width: auto;
		height: 1.875rem;
		text-align: center;
	}
</style>
<script lang="ts">
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

	// you can rewrite it to a single file component, if not, you should config vue alias to vue/dist/vue.esm-bundler.js
	const SubMenu = {
		name: 'SubMenu',
		props: {
			menuInfo: {
				type: Object,
				default: () => ({}),
			},
		},
		template: `
    <a-sub-menu :key="menuInfo.key">
      <template #icon><MailOutlined /></template>
      <template #title>{{ menuInfo.title }}</template>
      <template v-for="item in menuInfo.children" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <template #icon>
              <PieChartOutlined />
            </template>
            {{ item.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.key" />
        </template>
      </template>
    </a-sub-menu>
  `,
		components: {
			PieChartOutlined,
			MailOutlined,
		},
	};
	const list = [{
			key: '1',
			title: 'Option 1',
		},
		{
			key: '2',
			title: 'Navigation 2',
			children: [{
				key: '2.1',
				title: 'Navigation 3',
				children: [{
					key: '2.1.1',
					title: 'Option 2.1.1'
				}],
			}, ],
		},
	];
	export default defineComponent({
		setup() {
			const collapsed = ref < boolean > (false);

			const toggleCollapsed = () => {
				collapsed.value = !collapsed.value;
			};
			return {
				list,
				collapsed,
				toggleCollapsed,
			};
		},
		components: {
			'sub-menu': SubMenu,
			MenuFoldOutlined,
			MenuUnfoldOutlined,
			PieChartOutlined,
		},
	});
</script>
