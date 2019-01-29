<template>
	<div class="users">
		<el-row>
		    <el-col :span="24" class="user-search bg-purple">
				<myBreadcrumb  :level2="level2" :level3="level3"></myBreadcrumb>
		    </el-col>
		</el-row>
		<el-row>
		  	<el-col :span="8">		  		
		  		<el-input placeholder="请输入内容" v-model="dataQuery.query">
	
		  		  <el-button slot="append" icon="el-icon-search" @click="search" ></el-button>
		  		</el-input>
		  	</el-col>

		  	<el-col :span="3">
		  		<el-button type="success" plain @click="dialogFormVisible = true" >添加用户</el-button>
		  		<el-dialog title="用户修改" :visible.sync="dialogFormVisible">
		  		  <el-form :model="addForm" :rules="rules">
		  		    <el-form-item label="用户名" label-width="100px" prop="username">
		  		      <el-input v-model="addForm.username"  autocomplete="off"></el-input>
		  		    </el-form-item>		  		    
		  		    <el-form-item label="密码" label-width="100px" prop="password">
		  		      <el-input v-model="addForm.password"  autocomplete="off"></el-input>
		  		    </el-form-item>
		  		    <el-form-item label="邮箱" label-width="100px" prop="email">
		  		      <el-input v-model="addForm.email"  autocomplete="off"></el-input>
		  		    </el-form-item>
		  		    <el-form-item label="电话" label-width="100px" prop="mobile">
		  		      <el-input v-model="addForm.mobile"  autocomplete="off"></el-input>
		  		    </el-form-item>


		  		  </el-form>
		  		  <div slot="footer" class="dialog-footer">
		  		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		  		    <el-button type="primary" @click="submit">确 定</el-button>
		  		  </div>
		  		</el-dialog>
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
			    label="用户状态">
				<template slot-scope="scope">
					<el-switch
					  v-model="scope.row.mg_state"
					  active-color="#13ce66"
					  inactive-color="#ff4949" @change="updateStatus(scope.row.id, scope.row.mg_state)">
					</el-switch>
				</template>
			  </el-table-column>
			  <el-table-column
			    label="操作">
				<template slot-scope="caozuoScope">
					<el-button type="primary" icon="el-icon-edit" plain size="mini" @click="edit(caozuoScope.row)" ></el-button>
					<el-button type="success" icon="el-icon-delete" plain size="mini" @click="deleteOne(caozuoScope.row.id)"></el-button>
					<el-button type="danger" icon="el-icon-check" plain size="mini" @click="attributeRole(caozuoScope.row)"></el-button>

					<!-- 编辑用户 -->
					<el-dialog title="编辑用户" :visible.sync="editVisible">
					  <el-form :model="editForm" :rules="editValues">
					    <el-form-item label="用户名" label-width="100px" prop="username">
					      <el-input v-model="editForm.username"  autocomplete="off" disabled></el-input>
					    </el-form-item>		  		    
					    <el-form-item label="邮箱" label-width="100px" prop="email">
					      <el-input v-model="editForm.email"  autocomplete="off"></el-input>
					    </el-form-item>
					    <el-form-item label="电话" label-width="100px" prop="mobile">
					      <el-input v-model="editForm.mobile"  autocomplete="off"></el-input>
					    </el-form-item>


					  </el-form>
					  <div slot="footer" class="dialog-footer">
					    <el-button @click="dialogFormVisible = false">取 消</el-button>
					    <el-button type="primary" @click="submitEdit">确 定</el-button>
					  </div>
					</el-dialog>
					
					<!-- 编辑角色 -->
					<el-dialog title="分配角色" :visible.sync="roleVisible">
					  <el-form>
					    <el-form-item label="当前用户" label-width="100px" prop="username">
							{{currentUser.username}}
					    </el-form-item>		  		    
					    <el-form-item label="请选择角色" label-width="100px" prop="email">
					    	<el-select v-model="currentUser.role_name" placeholder="请选择">
					    	  <el-option
					    	    v-for="item in allRoleData"
					    	    :key="item.id"
					    	    :label="item.roleName"
					    	    :value="item.id">
					    	  </el-option>
					    	</el-select>
					    </el-form-item>

					  </el-form>
					  <div slot="footer" class="dialog-footer">
					    <el-button @click="roleVisible = false">取 消</el-button>
					    <el-button type="primary" @click="submitRole">确 定</el-button>
					  </div>
					</el-dialog>

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
				total: 0,
				dialogFormVisible: false,
				addForm: {
					username: "",
					password: "",
					email: "",
					mobile: "",
				},
				rules: {
				  username: [
				    { required: true, message: '请输入用户名称', trigger: 'change' },
				    { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'change' }
				  ],
				  password: [
				    { required: true, message: '请输入密码', trigger: 'change' },
				    { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'change' }
				  ],
				},
				editVisible: false,
				editForm: {
					username: "",
					email: "",
					mobile: "",
				},
				editValues: {
				  username: [
				    { required: true, message: '请输入用户名称', trigger: 'change' },
				    { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'change' }
				  ],
				},
				editId: 0,
				// 分配角色
				roleVisible: false,
				currentUser: {},
				selectValue: 0,
				allRoleData: {}


			}
		},
		created(){
			this.getData();
		},
		methods: {
			search() {
				this.getData();
			},
			getData() {
				console.log(this.dataQuery.query)
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
			},
			async submit() {
				this.dialogFormVisible = false;
				let res = await this.$axios.post("users", this.addForm);
				this.getData();
			},
			async updateStatus(id, status) {
				let res = await this.$axios.put(`users/${id}/state/${status}`);
				console.log(res)
			},
			async deleteOne(id) {
				let res = await this.$axios.delete(`users/${id}`);
				console.log(res);
				this.getData();
			},
			async submitEdit() {
				this.editVisible = false;
				let res = await this.$axios.put(`users/${this.editForm.id}`, {
					id: this.editForm.id,
					email: this.editForm.email,
					mobile: this.editForm.mobile
				})
			},
			edit(obj) {
				this.editVisible = true; 
				this.editForm = obj;

			},
			// 分配用户
			async attributeRole(currentUser) {
				this.roleVisible = true;
				this.currentUser = currentUser;
				let res = await this.$axios.get("roles");
				console.log(res);
				console.log(currentUser);
				this.allRoleData = res.data.data;
				this.selectValue = currentUser.id;
			},
			async submitRole() {
				this.roleVisible = false;
				let res = await this.$axios.put(`users/${this.currentUser.id}/role`, {
					rid: this.currentUser.role_name
				});
				console.log(res)
			}
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