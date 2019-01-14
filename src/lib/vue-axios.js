// 插件axios


import axios from "axios";
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";

// 按需引入element-ui
import {Message} from "element-ui";

// axios拦截器
axios.interceptors.request.use(config => {
	// console.log("aaa")
	// console.log(config);
	// console.log("aaa")
	// console.log(config.url)
	if (config.url.indexOf("/login") != -1) {

	}else {
		config.headers.Authorization = window.sessionStorage.getItem("token");
	}
	return config;
}, err => {
	return err;
})

axios.interceptors.response.use(response => {
	console.log("aa")
	console.log(response);
	Message.success(response.data.meta.msg);
	return response;
}, err => {
	return err;
})
export default {
	install(Vue) {
		Vue.prototype.$axios = axios;
	}
}