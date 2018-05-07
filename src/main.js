// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Cookies from 'js-cookie'
import store from './store'
import VueParticles from 'vue-particles'
import i18n from './lang' // Internationalization
import * as utils from '@/utils'
import 'font-awesome/less/font-awesome.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import '../static/css/base.less'
Vue.prototype.$axios = axios
Vue.use(VueParticles)

// Vue 的全局配置
Vue.config.productionTip = false

// 上线全局请求配置
axios.defaults.baseURL = 'api/v1/'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.headers['X-CSRF-TOKEN'] = Cookies.get('XSRF-TOKEN') // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        // 如果后端返回没有权限
        case 401:
          // 清除token信息并跳转到登录页面
          Cookies.set('isLogin', '0')
          router.replace('/signin')
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
})
