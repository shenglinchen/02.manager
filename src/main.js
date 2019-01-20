import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

// 导入axios
import axios from "./lib/vue-axios.js";

// 导入路由
import router from "./lib/vue-router.js";

// 导入moment
import moment from "moment";
Vue.filter("beautifyTime", value => {
	return moment(value).format("YYYY-MM-DD hh:mm:ss");
})

// 暴露axios
Vue.use(axios);

Vue.use(ElementUI);

// 导入初始化css
import "./assets/base.css";

// 导入组件
import myBreadcrumb from "./components/myBreadcrumb.vue";

Vue.component("myBreadcrumb", myBreadcrumb);

new Vue({
  el: '#app',
  render: h => h(App),
  router
});

