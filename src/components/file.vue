<template>
	<a-table :columns="columns" :row-key="record => record.id" :data-source="dataSource" :pagination="{
        current: table.pageNumber,
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40'],
        showTotal: (total,range) => `${range[0]}-${range[1]}共${total}条`,
        onShowSizeChange: (current, pageSize) =>{table.pageSize = pageSize; table.pageNumber = 1},
        onChange: (pageNumber) => table.pageNumber = pageNumber
    }" :loading="loading" @change="handleTableChange" bordered :scroll="{ y: 300 }"
		:row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
		<!-- 编辑整行 -->
		<template #name="{ text,record }">
			<a>{{ text }}</a>
		</template>
		<template v-for="col in ['name', 'age','time' ,'address']" #[col]="{ text, record }" :key="col">
			<div>
				<a-input v-if="editableData[record.id]" v-model:value="editableData[record.id][col]"
					style="margin: -5px 0" />
				<template v-else>
					{{ text }}
				</template>
			</div>
		</template>
		<!-- 修改，删除 -->
		<template #operation="{ record }">
			<div class="editable-row-operations">
				<span>
					<a-popconfirm v-if="dataSource.length" :title="'确定要删除'+record.name+'吗?'"
						@confirm="onDelete(record.id)">
						<DeleteOutlined />
					</a-popconfirm>
				</span>
				<span v-if="editableData[record.id]" style="margin-left: 50px;">
					<a @click="save(record.id)">保存</a>
					<a-popconfirm title="是否取消保存?" @confirm="cancel(record.id)">
						<a>取消保存</a>
					</a-popconfirm>
				</span>
				<span v-else style="margin-left: 50px;">
					<FormOutlined @click="edit(record.id)" />
				</span>
			</div>
		</template>
		<!-- 头部按钮 -->
		<template #title>
			<a-button class="editable-add-btn" @click="handleAdd" style="margin-bottom: 8px">
				<PlusOutlined />添加
			</a-button>
			<a-button class="editable-add-btn" @click="refresh" style="margin-bottom: 8px">
				<RedoOutlined spin />刷新
			</a-button>
			<a-button type="primary" :loading="loading" @click="start">
				全选
			</a-button>
		</template>
		<!-- 底部 -->
		<template #footer>Footer</template>
	</a-table>
</template>
<script lang="ts">
	import {
		PlusOutlined,
		RedoOutlined,
		DeleteOutlined,
		FormOutlined
	} from '@ant-design/icons-vue';
	import {
		TableState,
		TableStateFilters,
		ColumnProps
	} from 'ant-design-vue/es/table/interface';
	import {
		usePagination
	} from 'vue-request';
	import {
		computed,
		UnwrapRef,
		defineComponent,
		reactive,
		ref,
		toRefs
	} from 'vue';
	import {
		cloneDeep
	} from 'lodash-es';
	import axios from 'axios'
	type Key = ColumnProps['key'];
	type Pagination = TableState['pagination'];
	const columns = [{
			title: 'operation',
			dataIndex: 'operation',
			slots: {
				customRender: 'operation'
			},
		},
		{
			title: 'id',
			dataIndex: 'id',
			sorter: true,
		},
		{
			title: '姓名',
			dataIndex: 'name',
			sorter: true,
			width: '20%',
			slots: {
				customRender: 'name'
			},
			filters: [{
					text: 'j',
					value: 'j'
				},
				{
					text: 'n',
					value: 'n'
				},
			],
		},
		{
			title: '年龄',
			dataIndex: 'age',
			width: '20%',
			sorter: true,
			slots: {
				customRender: 'age'
			},
		},
		{
			title: '时间',
			dataIndex: 'time',
			ellipsis: true,
			sorter: true,
			slots: {
				customRender: 'time'
			},
		},
		{
			title: '地址',
			dataIndex: 'address',
			sorter: true,
			ellipsis: true,
			slots: {
				customRender: 'address'
			},
			filters: [{
					text: 'a',
					value: 'a'
				},
				{
					text: 'b',
					value: 'b'
				},
			],
		},
	];
	// 响应格式
	type APIResult = {
		data: {
			id: int,
			name: String,
			age: int,
			time: date,
			address: String,
		} [];
	};
	//表格
	const table = {
		pageNumber: 1,
		pageSize: 10
	}
	// 请求数据
	const queryData = () => {
		return `/api/users`;
	};
	export default defineComponent({
		setup() {
			const editableData: UnwrapRef < Record < string, DataItem >> = reactive({});
			// 数据
			const {
				data: dataSource,
				run,
				loading,
			} = usePagination < APIResult > (
				queryData, {
					formatResult: res => res.data,
				},
			);

			// 表格修改时
			const handleTableChange = (pag: Pagination, filters: TableStateFilters, sorter: any) => {
				run({
					results: pag!.pageSize!,
					page: pag?.current,
					sortField: sorter.field,
					sortOrder: sorter.order,
					...filters,
				});
			};
			// 添加
			const handleAdd = () => {
				let newData = {
					name: Math.round(Math.random() * 100),
					age: Math.round(Math.random() * 100),
					address: Math.round(Math.random() * 100),
				};
				axios.post('/api/users',
					newData
				).then(res => {
					dataSource.value.push(res.data.data);
				}).catch(err => {
					alert(err)
				})
			};
			// 删除
			const onDelete = (key: int) => {
				axios.delete('/api/users', {
					params: {
						id: key
					}
				}).then(res => {
					axios.get('/api/users').then(res => {
						dataSource.value = res.data.data
					})
				}).catch(err => {
					alert(err)
				})
			};

			// 编辑
			const edit = (key: int) => {
				console.log(dataSource)
				editableData[key] = dataSource[key];
			};
			// 保存
			const save = (key: int) => {
				axios.patch('/api/users',
					editableData[key]
				).then(res => {
					dataSource.value.push(res.data.data);
				}).catch(err => {
					alert(err)
				})
				delete editableData[key];

			};
			// 取消保存
			const cancel = (key: int) => {
				delete editableData[key];
			};
			// 刷新
			const refresh = () => {
				axios.get('/api/users').then(res => {
					dataSource.value = res.data.data
				})
			}
			// 选择框
			const state = reactive < {
				selectedRowKeys: Key[];
				loading: boolean;
			} > ({
				selectedRowKeys: [],
				loading: false,
			});
			// 全选
			const start = () => {
				setTimeout(() => {
					if (state.selectedRowKeys.length != 0) {
						state.selectedRowKeys = [];
					} else {
						for (let data of dataSource.value) {
							state.selectedRowKeys.push(data.id);
						}
					}
				})
			};
			// 修改
			const onSelectChange = (selectedRowKeys: Key[]) => {
				console.log('selectedRowKeys changed: ', selectedRowKeys);
				state.selectedRowKeys = selectedRowKeys;
			};
			return {
				dataSource,
				loading,
				columns,
				handleTableChange,
				handleAdd,
				onDelete,
				editingKey: '',
				editableData,
				edit,
				save,
				cancel,
				table,
				...toRefs(state),
				start,
				onSelectChange,
				refresh
			};
		},
		components: {
			PlusOutlined,
			RedoOutlined,
			DeleteOutlined,
			FormOutlined
		},
	});
</script>
<style scoped>
	.editable-row-operations a {
		margin-right: 8px;
	}
</style>
