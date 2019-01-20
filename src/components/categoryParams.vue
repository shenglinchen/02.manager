<template>
	<div class="users">
		<el-row>
		    <el-col :span="24" class="user-search bg-purple">
				<myBreadcrumb  :level2="level2" :level3="level3"></myBreadcrumb>
		    </el-col>
		</el-row>
		
		<el-row class="mt">
			<el-alert
			  title="注意：只允许为第三级分类设置相关参数！"
			  type="warning"
			  show-icon>
			</el-alert>
		</el-row>

		<el-row class="mt">
			<el-col :span="24">
				<span>
					请选择商品分类：
				</span>
				<el-cascader
				  expand-trigger="hover"
				  :options="options"
				  :props="props">
				</el-cascader>
			</el-col>
		</el-row>

		<el-row>
			<el-tabs v-model="activeName" >
			  <el-tab-pane label="动态参数" name="dynamic">
				<el-button type="primary">
					添加动态参数
				</el-button>
				<el-row class="mt">
					<el-table
					  border
					  :data="tableData"
					  style="width: 100%">
					  <el-table-column
					    prop="index"
					    width="30">
					  </el-table-column>
					  <el-table-column
					    prop="index"
					    label="#"
					    width="30"
					    type="index">
					  </el-table-column>
					  <el-table-column
					    prop="username"
					    label="商品参数"
					    width="180">
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
			  </el-tab-pane>
			  <el-tab-pane label="静态参数" name="static">
				<el-button type="primary">
					添加静态参数
				</el-button>
				<el-row class="mt">
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
					    label="属性名称"
					    width="180">
					  </el-table-column>
					  <el-table-column
					    prop="username"
					    label="属性值"
					    width="180">
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

			  </el-tab-pane>
			</el-tabs>
		</el-row>

	</div>
</template>

<script>
	export default {
		name: "users",
		data() {
			return {
				level2: "商品管理",
				level3: "分类参数",
				// 列表数据
				tableData: [

				],
				dataQuery: {
					query: "",
					pagenum: 1,
					pagesize: 10
				},
				total: 0,
				activeName: "dynamic",
				options: [],
				props: {
					label: "cat_name",
					value: "cat_id"
				}
			}
		},
		created(){
			this.$axios.get("categories", {
				params: {
					type: 3
				}
			})
			.then(res => {
				this.options = res.data.data;
			})
		}
	}
</script>

<style lang="scss">

</style>