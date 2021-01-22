// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'; //解决ie浏览器不支持promise
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible.js'
import '@/assets/iconfont/iconfont.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'
import md5 from 'js-md5';
import popTo from "./components/public/pop"
import Loading from "./components/public/loading"

Vue.use(popTo);
Vue.use(Loading);
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
window.axios = axios;
Vue.use(VueAxios, axios);
Vue.config.productionTip = false
/* eslint-disable no-new */

// 超时时间
axios.defaults.timeout = 20000
// http请求拦截器


axios.interceptors.response.use(data => { // 响应成功关闭loading
  if (data.data.status === 302) {
    router.push('/login');
    this.$store.state.loginStatus = false;
  }
  if (data.data.pup === true) {
    if (data.data.data.message && data.data.data.message !== "参数错误") {
      Vue.prototype.$pop.show({error:'',title:'温馨提示',content:data.data.data.message,content1:'',content2:'',number:1});
    } else {
      if (data.data.data !== "参数错误") {
        Vue.prototype.$pop.show({error:'',title:'温馨提示',content:data.data.data,content1:'',content2:'',number:1});
      }
    }
  }
  return data
}, error => {
  return Promise.reject(error)
})
export default axios
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: {
    App
  },
  template: '<App/>'
})
