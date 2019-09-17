import Vue from 'vue'
import Router from 'vue-router'
// import {setTitle} from '@com/utils'
Vue.use(Router)

// 首页
const view1 = () => import('../views/view1/index.vue')
// const base = 'tmd'.replace(/tmd/, location.pathname.split('/')[1]);

let router = new Router({
  mode: 'history',
  base: 'page2',
  routes: [
    {
      path: '/',
      component: view1,
      name: 'index ',
      meta: { title: 'xxxx' }
    }
  ]
})
router.beforeEach((to, from, next) => {
  let title = to.meta && to.meta.title
  if (title) {
    // setTitle(title)
  }
  next()
})
export default router
