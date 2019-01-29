<template>
	<div class="users">
		<el-row>
		    <el-col :span="24" class="user-search bg-purple">
				<myBreadcrumb  :level2="level2" :level3="level3"></myBreadcrumb>
		    </el-col>
		</el-row>

		<el-button type="primary" plain @click="addVisible = true">
			添加角色
		</el-button>
		<!-- 添加角色 -->

		<el-dialog title="添加角色" :visible.sync="addVisible">
		  <el-form :model="addForm" :rules="addValues" :ref="addForm">
		    <el-form-item label="角色名称" label-width="100px" prop="roleName">
		      <el-input v-model="addForm.roleName"  autocomplete="off"></el-input>
		    </el-form-item>		  		    
		    <el-form-item label="角色描述" label-width="100px" prop="roleDesc">
		      <el-input v-model="addForm.roleDesc"  autocomplete="off"></el-input>
		    </el-form-item>

		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="addVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submitAdd(addForm)">确 定</el-button>
		  </div>
		</el-dialog>
		

		<!-- 角色管理 -->
		<el-row>
			<el-table border :data="rolesData" style="width: 100%">
			  	<el-table-column type="expand">
			  		<template slot-scope="props">
			  			<el-row v-for="level1 in props.row.children" :key="level1.id">
			  				<el-col :span="4">
			  					<el-tag closable @close="removeRight(props.row, level1.id)">
			  						{{level1.authName}}
			  						
			  					</el-tag>
			  				</el-col>
			  				<el-col :span="20">
			  					<el-row v-for="level2 in level1.children" :key="level2.id">
			  						<el-col :span="8">
			  							<el-tag closable type="success" @close="removeRight(props.row, level2.id)">
			  								{{level2.authName}}
			  							</el-tag>
			  						</el-col>
			  						<el-col :span="16">
			  							<el-tag v-for="level3 in level2.children" :key="level3.id" type="warning" closable @close="removeRight(props.row, level3.id)">
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
						<el-button type="primary" icon="el-icon-edit" plain size="mini" @click="editRole(scope.row)"></el-button>
						<el-button type="success" icon="el-icon-delete" plain size="mini" @click="delRole(scope.row)"></el-button>
						<el-button type="danger" icon="el-icon-check" plain size="mini" @click="distriRig(scope.row)"></el-button>
					</template>
	
			  	</el-table-column>
			</el-table>
		</el-row>
		
		<!-- 编辑角色弹出框 -->
		<el-dialog
		  title="编辑角色"
		  :visible.sync="editVisible"
		  width="30%">
			
			<el-form :model="editRoleForm" :rules="rules" ref="editRoleForm" label-width="100px">
			  	<el-form-item label="角色名称" prop="roleName">
			  	  <el-input v-model="editRoleForm.roleName"></el-input>
			  	</el-form-item>
			  	<el-form-item label="角色描述" prop="roleDesc">
			  	  <el-input v-model="editRoleForm.roleDesc"></el-input>
			  	</el-form-item>
			 </el-form>

		  	<span slot="footer" class="dialog-footer">
		  	  <el-button @click="editVisible = false">取 消</el-button>
		  	  <el-button type="primary" @click="submitEdit()">确 定</el-button>
		  	</span>
		</el-dialog>

		<!-- 分配权限的树形控件 -->
		<el-dialog
		  title="分配权限"
		  :visible.sync="distriRigVisible"
		  width="30%">

		  <el-tree
		  	ref="tree"
		    :data="distriRights"
		    show-checkbox
		    node-key="id"
		    :default-expanded-keys="checkedRights"
		    :default-checked-keys="checkedRights"
		    :props="defaultProps">
		  </el-tree>

		  <span slot="footer" class="dialog-footer">
		    <el-button @click="distriRigVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submitDistri()">确 定</el-button>
		  </span>
		</el-dialog>


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
				total: 0,
				addVisible: false,
				addForm: {
					username: "",
					desc: ""
				},
				addValues: {
				  roleName: [
				    { required: true, message: '请输入角色名称', trigger: 'change' },
				    { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'change' }
				  ],
				  roleDesc: [
				    { required: true, message: '请输入描述', trigger: 'change' },
				    { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'change' }
				  ],
				},
				editVisible: false,
				editRoleForm: {
					roleName: "",
					roleDesc: ""
				},
				rules: {
				  roleName: [
				    { required: true, message: '请输入角色名称', trigger: 'change' },
				  ],
				  roleDesc: [
				    { required: true, message: '请输入角色描述', trigger: 'change' },
				  ]
				},
				editId: 0,
				// 分配权限
				defaultProps: {
					label: "authName",
					children: "children"
				},
				distriRights: [],
				distriRigVisible: false,
				checkedRights: [],
				distriId: 0

			}
		},
		// 使用async来让从上到下执行
		async created(){

			this.getRoles();
			// console.log(this.rolesData)
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
		},
		methods: {
			async getRoles() {
				let res = await this.$axios.get("roles");

				this.rolesData = res.data.data;
			},
			async removeRight(user, rightId) {
				// console.log(this.rolesData)
				// console.log(user.id);
				// console.log(rightId);
				let res = await this.$axios.delete(`roles/${user.id}/rights/${rightId}`);
				// console.log(res);
				user.children = res.data.data;
				// console.log(user)


			},
			submitAdd (formName) {
        		this.$refs[formName].validate(async (valid) => {
        		  if (valid) {
        		  	console.log(formName)
        		  	let res = await this.$axios.post("roles", formName);
        		  	console.log(res);
        		  	this.getRoles();
        		  	this.addVisible = false;
        		  	this.addForm = {};
        		  } else {
        		    console.log('error submit!!');
        		    return false;
        		  }
        		});
      		},

      		editRole(data) {
      			this.editVisible = true;
      			console.log(data)
      			this.editRoleForm.roleName = data.roleName;
      			this.editRoleForm.roleDesc = data.roleDesc;

      			this.editId = data.id;
      		},
      		async submitEdit() {
      			this.editVisible = false;
      			await this.$axios.put(`roles/${this.editId}`, this.editRoleForm);

      			this.getRoles();
      		},
      		// 删除角色
      		async delRole(data) {
      		// 弹出
      		 this.$confirm('是否删除该角色', '警告', {
      		   confirmButtonText: '确定',
      		   cancelButtonText: '取消',
      		   type: 'warning'
      		 }).then(async () => {
      			await this.$axios.delete(`/roles/${data.id}`);
      		   	await this.getRoles();
      		 }).catch(() => {
      		   this.$message({
      		     type: 'info',
      		     message: '已取消删除'
      		   });          
      		  });
      		},
      		// 分配权限
      		async distriRig(data) {
      			this.checkedRights = [];
      			this.distriId = data.id;
      			this.distriRigVisible = true;
      			let backData = await this.$axios.get("/rights/tree");
      			this.distriRights = backData.data.data;
      			// 递归获取已经被勾选的权限
      			let findChildren = (father) => {
      				// 如果该数据有子元素，那么遍历子元素，继续虚招子元素中的被选中的
      				if (father.children != undefined) {
      					father.children.forEach(v => {
      						findChildren(v);
      					})
      				}else {
      					this.checkedRights.push(father.id);
      				}
      			}

      			// 在data中存有该角色的权限
      			findChildren(data);
      		},
      		// 提交分配的权限
      		async submitDistri() {
      			let checkedKey = this.$refs.tree.getCheckedKeys().join(",");
      			console.log(this.distriId)
      			let backdata = await this.$axios.post(`roles/${this.distriId}/rights`, {
      				rids: checkedKey
      			});
      			console.log(backdata)
      			this.getRoles();
      			this.distriRigVisible = false;
      		}
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