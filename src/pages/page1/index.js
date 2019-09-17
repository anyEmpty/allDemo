// import 'babel-polyfill'
import '@/common/utils/dataUtils'
import Vue from 'vue'
import App from './index.vue'
import router from './router/index.js'
import register from '@com/register'
import store from './store/index.js'

// Vue.mixin({
//   created: () => {
//     console.log('我是全局混入的')
//   }
// })
window.store = store;
register({
  Vue,
  router,
  store
  // project: 'index'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
