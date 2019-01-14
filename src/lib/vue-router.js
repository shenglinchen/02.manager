//路由设置

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 导入模块
import index from "../components/index.vue";
import login from "../components/login.vue";

// 定义路由
const routes = [
	{
		path: "/",
		component: index
	},
	{
		path: "/login",
		component: login
	}

]


const router = new VueRouter ({
	routes
})


// 设置导航守卫：在路由跳转时执行的回调函数

router.beforeEach((to, from, next) => {
	// to去哪里
	// from从哪里来
	// next执行下一个函数
	// console.log(to);
	// console.log(from);
	if (to.path == "/login") {
		next();
	}else {
		if (!window.sessionStorage.getItem("token")) {
			// console.log(to)
		    Vue.prototype.$message.error("请先登录");
			// Vue.prototype.$router.push("login");为什么不行
			next("/login")

		}else {
			next();
		}
	}
})
export default router;