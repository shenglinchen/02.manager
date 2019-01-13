import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

// 导入axios
import axios from "./lib/vue-axios.js";

// 导入路由
import router from "./lib/vue-router.js";

// 暴露axios
Vue.use(axios);

Vue.use(ElementUI);

// 导入初始化css
import "./assets/base.css";

new Vue({
  el: '#app',
  render: h => h(App),
  router
});

