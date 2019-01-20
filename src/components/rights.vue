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
			  <el-table-column prop="authName" label="权限名称" width="180">
			  </el-table-column>
			  <el-table-column prop="path" label="路径" width="250">
			  </el-table-column>
			  <el-table-column prop="level" label="层级" width="250">
			  	<template slot-scope="props">
			  		<span v-if="props.row.level === '0'">一级</span>
			  		<span v-else-if="props.row.level === '1'">二级</span>
			  		<span v-else-if="props.row.level === '2'">三级</span>
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
				level2: "权限管理",
				level3: "权限列表",
				// 列表数据
				tableData: [

				],
	
			}
		},
		async created(){
			let res = await this.$axios.get("rights/list");

			// console.log(res)
			this.tableData = res.data.data;
		}
	}
</script>

<style lang="scss">

</style>