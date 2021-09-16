<template>
	<a-layout style="min-height: 100vh">
		<a-layout-sider v-model:collapsed="collapsed" collapsible>
			<div class="logo">
				<h2  style="color:red">我是个logo</h2>
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
			<a-layout-header style="background: #fff;;display:table">
				<a-row>
					<a-col :span="12">
						<a-input-search v-model:value="value" placeholder="搜索框" enter-button @search="onSearch"
							style="width: 31.25rem;display：table-cell;vertical-align: middle;" />
					</a-col>
					<a-col :span="12" style="text-align: right;">
						<span>
							<a-badge :count="1" style="margin-top: 0.625rem;margin-bottom: 0.625rem;">
								<a-avatar shape="square" :size="64">>
									<template #icon>
										<AntDesignOutlined />
									</template>
								</a-avatar>
							</a-badge>
						</span>
					</a-col>
				</a-row>
			</a-layout-header>
			<a-layout-content style="margin: 0 16px">
				<a-breadcrumb style="margin: 16px 0">
					<a-breadcrumb-item>假的(父)</a-breadcrumb-item>
					<a-breadcrumb-item>假的(子)</a-breadcrumb-item>
				</a-breadcrumb>
				<div :style="{ padding: '24px', background: '#fff', minHeight: '800px' }">
					<sku :sum="4"></sku>
					<span>
						<a-progress :stroke-color="{
					        '0%': '#108ee9',
					        '100%': '#87d068',
					      }" :percent="99.9" />
					</span>
					<span>
						<a-progress :stroke-color="{
					        from: '#108ee9',
					        to: '#87d068',
					      }" :percent="99.9" status="active" />
					</span>
					<span>
						<a-progress type="circle" :stroke-color="{
					        '0%': '#108ee9',
					        '100%': '#87d068',
					      }" :percent="90" />
					</span>
					<span>
						<a-progress type="circle" :stroke-color="{
					        '0%': '#108ee9',
					        '100%': '#87d068',
					      }" :percent="100" />
					</span>
				</div>
			</a-layout-content>
			<a-layout-footer style="text-align: center">
				我是底部
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
		UserOutlined,
		AntDesignOutlined,
	} from '@ant-design/icons-vue';
	import sku from '@/components/sku.vue'
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
	const list = [
		{
			key: '1',
			title: 'Option 1',
		},
		{
			key: '2',
			title: 'Navigation 2',
			children: [
				{
					key: '2.1',
					title: 'Navigation 3',
					children: [
						{
							key: '2.1.1',
							title: 'Option 2.1.1'
						},
					],
				}, 
			],
		},
	];
	export default defineComponent({
		setup() {
			const collapsed = ref < boolean > (false);

			const toggleCollapsed = () => {
				collapsed.value = !collapsed.value;
			};
			const value = ref < string > ('');
			const onSearch = (searchValue: string) => {
				console.log('use value', searchValue);
				console.log('or use this.value', value.value);
			};

			return {
				list,
				collapsed,
				toggleCollapsed,
				value,
				onSearch,
			};
		},
		components: {
			'sub-menu': SubMenu,
			sku,
			MenuFoldOutlined,
			MenuUnfoldOutlined,
			PieChartOutlined,
			UserOutlined,
			AntDesignOutlined,
		},
	});
</script>
