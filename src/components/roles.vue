<template>
	<div class="users">
		<el-row>
		    <el-col :span="24" class="user-search bg-purple">
				<myBreadcrumb  :level2="level2" :level3="level3"></myBreadcrumb>
		    </el-col>
		</el-row>

		<el-button type="primary" plain>
			添加角色
		</el-button>

		<el-row>
			<el-table border :data="rolesData" style="width: 100%">
			  	<el-table-column type="expand">
			  		<template slot-scope="props">
			  			<el-row v-for="level1 in props.row.children" :key="level1.id">
			  				<el-col :span="4">
			  					<el-tag closable >
			  						{{level1.authName}}
			  						
			  					</el-tag>
			  				</el-col>
			  				<el-col :span="20">
			  					<el-row v-for="level2 in level1.children" :key="level2.id">
			  						<el-col :span="8">
			  							<el-tag closable type="success">
			  								{{level2.authName}}
			  							</el-tag>
			  						</el-col>
			  						<el-col :span="16">
			  							<el-tag v-for="level3 in level2.children" :key="level3.id" type="warning" closable>
			  								{{level3.authName}}
			  							</el-tag>
			  						</el-col>
			  					</el-row>

			  				</el-col>
			  			</el-row>
			  			<div v-if="props.row.children.length == 0">
			  				没有数据
			  			</div>
			  		</template>

			  	</el-table-column>
			  	<el-table-column prop="index" label="#" width="30" type="index">
			  	</el-table-column>
			  	<el-table-column prop="roleName" label="角色名称" width="180">
			  	</el-table-column>
			  	<el-table-column prop="roleDesc" label="角色描述" width="250">
			  	</el-table-column>
			  	<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
						<el-button type="success" icon="el-icon-delete" plain size="mini"></el-button>
						<el-button type="danger" icon="el-icon-check" plain size="mini"></el-button>
					</template>
	
			  	</el-table-column>
			</el-table>
		</el-row>


	</div>
</template>

<script>
	export default {
		name: "users",
		data() {
			return {
				level2: "角色管理",
				level3: "角色列表",
				// 列表数据
				rolesData: [

				],
				dataQuery: {
					query: "",
					pagenum: 1,
					pagesize: 10
				},
				total: 0
			}
		},
		// 使用async来让从上到下执行
		async created(){

			let res = await this.$axios.get("roles");

			this.rolesData = res.data.data;
			// console.log(res.data.data);

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
		}
	}
</script>

<style lang="scss" scoped>
	.users {
		.user-search {
			height: 40px;
			line-height: 40px;
			display: flex;
			align-items: center;
			padding-left: 10px;
		}

		.el-tag {
			margin: 5px;
		}
	}
</style>