// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import elementUI from 'element-ui'
import axios from 'axios'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false

Vue.use(elementUI)
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
