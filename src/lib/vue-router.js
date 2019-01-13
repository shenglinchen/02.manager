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

export default router;