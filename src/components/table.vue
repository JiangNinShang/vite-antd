<template>
	<div>
		<div class="table-operations">
			<a-button @click="clearFilters">
				<RedoOutlined spin />刷新
			</a-button>
			<a-button @click="clearAll">
				<PlusOutlined />添加
			</a-button>
			<a-button @click="clearFilters">
				<DeleteOutlined />清空筛选
			</a-button>
			<a-button @click="clearAll">
				<DeleteOutlined />清空所有条件和排序
			</a-button>
		</div>
		<a-table :pagination="pagination" :loading="loading" :columns="columns" :data-source="data"
			@change="handleChange" bordered :scroll="{ y: 240 }">
			<template v-for="col in ['name', 'age', 'address']" #[col]="{ text, record }" :key="col">
				<div>
					<a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][col]"
						style="margin: -5px 0" />
					<template v-else>
						{{ text }}
					</template>
				</div>
			</template>
			<template #operation="{ record }">
				<div style="display:flex">
					<div style="margin-left: 10%;">
						<a-popconfirm v-if="data.length" :title="'是否删除'+data[record.key].name+'?' "
							@confirm="onDelete(record.key)">
							<DeleteOutlined />
						</a-popconfirm>
					</div>
					<div style="margin-left:50%">
						<span v-if="editableData[record.key]">
							<a @click="save(record.key)">Save</a>
							<a-popconfirm title="是否取消保存?" @confirm="cancel(record.key)">
								<a style="margin-left: 20px;">Cancel</a>
							</a-popconfirm>
						</span>
						<span v-else>
							<EditOutlined @click="edit(record.key)" />
						</span>
					</div>
				</div>
			</template>
		</a-table>
	</div>
</template>

<script lang="ts">
	import {
		computed,
		defineComponent,
		ref,
		reactive,
		UnwrapRef
	} from 'vue';
	import {
		cloneDeep
	} from 'lodash-es';
	import {
		TableState,
		TableStateFilters,
		ColumnProps
	} from 'ant-design-vue/es/table/interface';
	import {
		RedoOutlined,
		DeleteOutlined,
		EditOutlined,
		PlusOutlined
	} from '@ant-design/icons-vue';
	type Key = ColumnProps['key'];
	type Pagination = TableState['pagination'];
	interface DataItem {
		key: string;
		name: string;
		age: number;
		address: string;
	}
	export default defineComponent({
		components: {
			RedoOutlined,
			DeleteOutlined,
			EditOutlined,
			PlusOutlined
		},
		setup() {
			const filteredInfo = ref();
			const sortedInfo = ref();
			const loading = ref(false);
			const pagination = ref({
				total: 0,
				pageSize: 5, //每页中显示10条数据
				showSizeChanger: true,
				pageSizeOptions: ["5", "10", "20", "50"], //每页中显示的数据
				showTotal: total => `共有 ${total} 条数据`, //分页中显示总的数据
			});
			const queryParam = ref({
				page: 1, //第几页
				size: 5, //每页中显示数据的条数
				hosName: "",
				hosCode: "",
				province: "",
				city: ""
			});
			const editableData: UnwrapRef < Record < string, DataItem >> = reactive({});
			const data: Ref < DataItem[] > = ref([{
					key: '0',
					name: 'Edward King 0',
					age: 32,
					address: 'London, Park Lane no. 0',
				},
				{
					key: '1',
					name: 'Edward King 1',
					age: 32,
					address: 'London, Park Lane no. 1',
				},
				{
					key: '2',
					name: 'Edward King 3',
					age: 32,
					address: 'London, Park Lane no. 2',
				},
				{
					key: '3',
					name: 'Edward King 4',
					age: 32,
					address: 'London, Park Lane no. 3',
				},
				{
					key: '4',
					name: 'Edward King 5',
					age: 32,
					address: 'London, Park Lane no. 4',
				},
				{
					key: '5',
					name: 'Edward King 6',
					age: 32,
					address: 'London, Park Lane no. 5',
				}, {
					key: '6',
					name: 'Edward King 7',
					age: 32,
					address: 'London, Park Lane no. 6',
				},
				{
					key: '7',
					name: 'Edward King 10',
					age: 32,
					address: 'London, Park Lane no. 7',
				},
				{
					key: '8',
					name: 'Edward King 11',
					age: 32,
					address: 'London, Park Lane no. 8',
				},
				{
					key: '9',
					name: 'Edward King 10',
					age: 32,
					address: 'London, Park Lane no. 9',
				},
				{
					key: '10',
					name: 'Edward King 11',
					age: 32,
					address: 'London, Park Lane no. 10',
				},
				{
					key: '11',
					name: 'Edward King 10',
					age: 32,
					address: 'London, Park Lane no. 11',
				},
				{
					key: '12',
					name: 'Edward King 11',
					age: 32,
					address: 'London, Park Lane no. 12',
				},
			]);
			const dataSource = ref(data);
			const columns = computed(() => {
				const filtered = filteredInfo.value || {};
				const sorted = sortedInfo.value || {};
				return [{
						title: 'operation',
						dataIndex: 'operation',
						slots: {
							customRender: 'operation'
						},
					}, {
						title: 'Name',
						dataIndex: 'name',
						key: 'name',
						filters: [{
								text: 'Joe',
								value: 'Joe'
							},
							{
								text: 'Jim',
								value: 'Jim'
							},
						],
						filteredValue: filtered.name || null,
						onFilter: (value: string, record: DataItem) => record.name.includes(value),
						sorter: (a: DataItem, b: DataItem) => a.name.length - b.name.length,
						sortOrder: sorted.columnKey === 'name' && sorted.order,
						ellipsis: true,
						width: '25%',
						slots: {
							customRender: 'name'
						},
					},
					{
						title: 'Age',
						dataIndex: 'age',
						key: 'age',
						sorter: (a: DataItem, b: DataItem) => a.age - b.age,
						sortOrder: sorted.columnKey === 'age' && sorted.order,
						width: '15%',
						slots: {
							customRender: 'age'
						},
					},
					{
						title: 'Address',
						dataIndex: 'address',
						key: 'address',
						filters: [{
								text: 'London',
								value: 'London'
							},
							{
								text: 'New York',
								value: 'New York'
							},
						],
						filteredValue: filtered.address || null,
						onFilter: (value: string, record: DataItem) => record.address.includes(value),
						sorter: (a: DataItem, b: DataItem) => a.address.length - b.address.length,
						sortOrder: sorted.columnKey === 'address' && sorted.order,
						ellipsis: true,
						width: '40%',
						slots: {
							customRender: 'address'
						},
					},

				];
			});

			const handleChange = (pagination: Pagination, filters: TableStateFilters, sorter: any) => {
				filteredInfo.value = filters;
				sortedInfo.value = sorter;
			};
			const clearFilters = () => {
				filteredInfo.value = null;
			};
			const clearAll = () => {
				filteredInfo.value = null;
				sortedInfo.value = null;
			};
			const edit = (key: string) => {
				editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
			};
			const save = (key: string) => {
				Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
				delete editableData[key];
			};
			const cancel = (key: string) => {
				delete editableData[key];
			};
			const onDelete = (key: string) => {
				dataSource.value.splice(key, 1);
			}
			return {
				dataSource,
				editableData,
				data,
				columns,
				handleChange,
				clearFilters,
				clearAll,
				edit,
				save,
				cancel,
				editingKey: '',
				onDelete,
				loading,
				pagination,
				queryParam
			};
		},
	});
</script>
<style scoped>
	.table-operations {
		margin-bottom: 16px;
	}

	.table-operations>button {
		margin-right: 8px;
	}
</style>
