<template>
	<div class="users">
		<el-row>
		    <el-col :span="24" class="user-search bg-purple">
				<myBreadcrumb  :level2="level2" :level3="level3"></myBreadcrumb>
		    </el-col>
		</el-row>
		<el-row>
		  	<el-col :span="8">		  		
		  		<el-input placeholder="请输入内容">
	
		  		  <el-button slot="append" icon="el-icon-search"></el-button>
		  		</el-input>
		  	</el-col>

		  	<el-col :span="3">
		  		<el-button type="success" plain>添加商品</el-button>
		  	</el-col>
		</el-row>
		<el-row>
			<el-table border :data="tableData" style="width: 100%">
			  <el-table-column prop="index" label="#" width="60" type="index">
			  </el-table-column>
			  <el-table-column prop="goods_name" label="商品名称" width="500">
			  </el-table-column>
			  <el-table-column prop="goods_price" label="商品价格" width="100">
			  </el-table-column>
			  <el-table-column prop="goods_weight" label="商品重量" width="100">
			  </el-table-column>
			  <el-table-column label="创建时间" width="300">
				<template slot-scope="scope">
					{{scope.row.add_time | beautifyTime}}
				</template>
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
				level2: "商品管理",
				level3: "商品列表",
				// 列表数据
				tableData: [

				],
				dataQuery: {
					query: "",
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
				let res = await this.$axios.get("goods", {
					params: this.dataQuery
				});

				// console.log(res);
				this.tableData = res.data.data.goods;
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