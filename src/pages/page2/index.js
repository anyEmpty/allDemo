// import 'babel-polyfill'
import Vue from 'vue'
import App from './index.vue'
import router from './router/index.js'
// import store from '../../store/index.js'

import register from '@com/register'

register({
  Vue,
  router
  // project: 'index'
})
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
