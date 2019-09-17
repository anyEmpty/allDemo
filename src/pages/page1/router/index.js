import Vue from 'vue'
import Router from 'vue-router'
// import {setTitle} from '@com/utils'
Vue.use(Router)

// 首页
const view1 = () => import('../views/view1/index.vue')
const view2 = () => import('../views/view2/index.vue')
const view3 = () => import('../views/view3/index.vue')

// const base = 'tmc'.replace(/tmc/, location.pathname.split('/')[1]);

// console.log(base, 66)
let router = new Router({
  mode: 'history',
  base: 'page1',
  routes: [
    {
      path: '/',
      component: view1,
      name: 'view1 ',
      meta: { title: 'xxx' }
    },
    {
      path: '/view2',
      component: view2,
      name: 'view2',
      meta: { title: 'xxx' }
    },
    {
      path: '/view3',
      component: view3,
      name: 'view3',
      meta: { title: 'xxx' }
    }
  ]
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
