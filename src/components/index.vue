<template>
	<div class="index-container">
		<!-- <myBreadcrumb level2="第一季" level3="第二季"></myBreadcrumb> -->
		<el-container class="all-container">
			<el-header>
				<el-row>
				  <el-col :span="4">
				  	<img src="../assets/logo.png" alt="">
				  </el-col>
				  <el-col :span="18">
				  	后台管理
				  </el-col>
				  <el-col :span="2">
				  	<el-button type="danger" @click="logout">退出</el-button>
				  </el-col>
				</el-row>
			</el-header>
			<el-container class="content-container">
				<el-aside>
					<el-menu
					  default-active="2"
					  class="el-menu-vertical-demo"
					  background-color="#545c64"
					  text-color="#fff"
					  active-text-color="#ffd04b"
					  router>
					  <!-- 通过key来分辨点击的时哪一个，进而展开 -->
					  	<el-submenu :index="item.order + ''" v-for="(item, index) in menuList" :key="item.id">
					    	<template slot="title" class="el-submenu-title">
					    	  	<i class="el-icon-location"></i>
					    	  	<span>
					    	  		{{item.authName}}
					    	  	</span>
					    	</template>
					    	<el-menu-item-group>
					    	  	<el-menu-item v-for="(it, index) in item.children" :index="it.path">
									<i class="el-icon-menu"></i>
					    	  		{{it.authName}}
					  		  	</el-menu-item>
	
					    	</el-menu-item-group>

					  	</el-submenu>

					</el-menu>
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: "index",
		// 设置导航守卫后，不需要了
		// beforeCreate() {
		// 	if (!window.sessionStorage.getItem("token")) {
  //               this.$message.error("请先登录");
		// 		this.$router.push("login");
		// 	}
		// }
		data() {

			return {
				menuList: []
			}
		},
		methods: {
			logout() {


				this.$confirm('是否退出？', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {

				  this.$message({
				    type: 'success',
				    message: '请登录'
				  });
				  window.sessionStorage.removeItem("token");
				  this.$router.push("login");
				}).catch(() => {
				  // this.$message({
				  //   type: 'info',
				  //   message: ''
				  // });          
				});
			},
		},

		beforeCreate() {
			this.$axios.get("menus", {
				// headers: {
				// 	"Authorization": window.sessionStorage.getItem("token"),
				// }
			})
			.then(res => {
				// console.log(res);
				this.menuList = res.data.data;
				// console.log(this.menuList)
			})
		}
	}
</script>

<!-- 为什么要去掉scoped -->
<style lang="scss">
// <style lang="scss" scoped>
	.index-container {
		height: 100%;
		.all-container {

			height: 100%;
			.el-header {
				background-color: #fff;
				.el-row {
					text-align: center;
					height: 100%;
					line-height: 60px;
					.el-col-4 {
						height: 100%;
						vertical-align: center;
						img {
							height: 50px;
						}
					}

					.el-col-18 {
						font-size: 40px;
					}
					
				}

			}
			.el-container {
				.el-aside {
					.el-menu {
						border: 0;

					}
					.el-submenu__title {
						text-align: left;
					}
				}
				.el-main {
				}
			}

			.el-header, .el-footer {
			  background-color: #B3C0D1;
			  color: #333;
			  text-align: center;
			  line-height: 60px;
			}
			
			.el-aside {
			  background-color: #D3DCE6;
			  color: #333;
			  text-align: center;
			  line-height: 200px;
			}
			
			.el-main {
			  background-color: #E9EEF3;
			  color: #333;
			}
			
		}
	}


</style>