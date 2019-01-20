<template>
	<div class="users">
		<el-row>
		    <el-col :span="24" class="user-search bg-purple">
				<myBreadcrumb  :level2="level2" :level3="level3"></myBreadcrumb>
		    </el-col>
		</el-row>

		<el-row>
			<el-table border :data="tableData" style="width: 100%">
			  <el-table-column prop="index" label="#" width="60" type="index">
			  </el-table-column>
			  <el-table-column prop="order_number" label="订单编号" width="500">
			  </el-table-column>
			  <el-table-column prop="order_price" label="订单价格" width="100">
			  </el-table-column>
			  <el-table-columnlabel="是否付款" width="100">
			  	<template slot-scope="props">
			  		<!-- <el-button type="error" plain v-if="props.row.pay_status === '0'">未付款</el-button>
			  		<el-button type="primary" plain v-if="props.row.pay_status === '1'">未付款</el-button> -->
			  	</template>
			  </el-table-column>
			  <el-table-column prop="goods_weight" label="是否发货" width="100">
			  </el-table-column>			  
			  <el-table-column prop="goods_weight" label="下单时间" width="100">
			  </el-table-column>
			  <el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
					<el-button type="success" icon="el-icon-delete" plain size="mini"></el-button>
				</template>

			  </el-table-column>
			</el-table>
		</el-row>

		<el-row>
			<el-pagination
			  :current-page="1"
			  :page-sizes="[2, 4, 8, 10]"
			  :page-size="10"
			  layout="total, sizes, prev, pager, next, jumper"
			  @current-change="pageChange"
			  @size-change="sizeChange"
			  :total="total">
			</el-pagination>
		</el-row>

	</div>
</template>

<script>
	export default {
		name: "users",
		data() {
			return {
				level2: "订单管理",
				level3: "订单列表",
				// 列表数据
				tableData: [

				],
				dataQuery: {
					pagenum: 1,
					pagesize: 10
				},
				total: 0
			}
		},
		async created(){
			this.getData();
			// this.$axios.get("users", {
			// 	params: this.dataQuery
			// }).then(res => {
			// 	console.log(res);
			// 	this.tableData = res.data.data.users;
			// 	this.total = res.data.data.total;
			// })
			// .catch(err => {
			// 	console.log(err);
			// })
		},
		methods: {
			async getData(){
				let res = await this.$axios.get("orders", {
					params: this.dataQuery
				});

				// console.log(res);
				this.tableData = res.data.data.goods;
				console.log(this.tableData)
				this.total = res.data.data.total;
			},
			pageChange(val) {
				this.dataQuery.pagenum = val;
				this.getData();
			},
			sizeChange(val) {
				this.dataQuery.pagesize = val;
				this.getData();
			}
		}
	}
</script>

<style lang="scss">

</style>