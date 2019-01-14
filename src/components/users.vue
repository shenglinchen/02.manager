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
		  		<el-button type="success" plain>添加用户</el-button>
		  	</el-col>
		</el-row>
		<el-row>
			<el-table
			  border
			  :data="tableData"
			  style="width: 100%">
			  <el-table-column
			    prop="index"
			    label="#"
			    width="30"
			    type="index">
			  </el-table-column>
			  <el-table-column
			    prop="username"
			    label="姓名"
			    width="180">
			  </el-table-column>
			  <el-table-column
			    prop="email"
			    label="邮箱"
			    width="250">
			  </el-table-column>
			  <el-table-column
			    prop="mobile"
			    label="电话"
			    width="250">
			  </el-table-column>
			  <el-table-column
			    label="操作">
				<template slot-scope="scope">
					<el-switch
					  v-model="scope.row.mg_state"
					  active-color="#13ce66"
					  inactive-color="#ff4949">
					</el-switch>
				</template>
			  </el-table-column>
			  <el-table-column
			    label="操作">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
					<el-button type="success" icon="el-icon-delete" plain size="mini"></el-button>
					<el-button type="danger" icon="el-icon-check" plain size="mini"></el-button>
				</template>

			  </el-table-column>
			</el-table>
		</el-row>

		<el-row>
			<el-pagination
			  :current-page="total"
			  :page-sizes="[2, 4, 8, 10]"
			  :page-size="10"
			  layout="total, sizes, prev, pager, next, jumper"
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
				level2: "用户管理",
				level3: "用户列表",
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
		created(){
			this.$axios.get("users", {
				params: this.dataQuery
			}).then(res => {
				console.log(res);
				this.tableData = res.data.data.users;
				this.total = res.data.data.total;
			})
			.catch(err => {
				console.log(err);
			})
		}
	}
</script>

<style lang="scss">
	.users {
		.user-search {
			height: 40px;
			line-height: 40px;
			display: flex;
			align-items: center;
			padding-left: 10px;
		}
	}
</style>