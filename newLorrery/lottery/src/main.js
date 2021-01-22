import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'babel-polyfill'
import 'core-js/es6/promise'
import VueMoment from 'vue-moment'
import AsyncComputed from 'vue-async-computed'
import './assets/iconfont/iconfont.css'
import './assets/animate.min.css'
// import './../config/rem'
import './components/global'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import FastClick from 'fastclick'
require('es6-promise').polyfill()
FastClick.attach(document.body)
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
})
router.beforeEach((to, from, next) => {
  if (to.name === 'second') {
    store.commit('SAVELOADINGFLAG', true)
  }
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
Vue.use(VueAxios, axios)
Vue.use(AsyncComputed)
Vue.use(VueMoment)
Vue.config.productionTip = false
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
