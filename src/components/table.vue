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
		<a-table :columns="columns" :data-source="data" @change="handleChange" bordered :scroll="{ y: 240 }">
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
						<a-popconfirm v-if="data.length" title="Sure to delete?" @confirm="onDelete(record.key)">
							<DeleteOutlined />
						</a-popconfirm>
					</div>
					<div style="margin-left:50%">
						<span v-if="editableData[record.key]">
							<a @click="save(record.key)">Save</a>
							<a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
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


	const data: DataItem[] = [];
	for (let i = 0; i < 100; i++) {
		data.push({
			key: i.toString(),
			name: `Edrward ${i}`,
			age: 32,
			address: `London Park no. ${i}`,
		});
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
			const dataSource = ref(data);
			const editableData: UnwrapRef < Record < string, DataItem >> = reactive({});
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
				console.log('Various parameters', pagination, filters, sorter);
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
