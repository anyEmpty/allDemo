// import confirm from '@/widgets/confirm/confirm.js'
import Alert from '@/widgets/alert/alert.js'
import Loading from '@/widgets/loading/index.js'
import message from '@/widgets/message/message.js'
import * as utils from './utils/index.js'
import { initStorage } from './utils/store.js'
console.log(utils, 777)
// import { tqKit } from "tqkit"
// import goLastPage from 'tmccom/methods/goLastPage'
// import res from './rem.js'
// res()
export default ({ Vue, router, project } = {}) => {
  location.href.indexOf('page2') === -1 && initStorage({
    Vue,
    cb: () => {
      console.log('store text')
    }
  })

  Vue.$loading = Vue.prototype.$loading = Loading
  Vue.$alert = Vue.prototype.$alert = Alert
  Vue.use(message)
  // Vue.$totast = Vue.prototype.$totast = Totast
  // Vue.$confirm = Vue.prototype.$confirm = confirm
  // Vue.prototype.$backHome = utils.backHome
  Vue.prototype.$open = utils.open
  // Vue.prototype.$uRouter = new goLastPage(router, Vue)
  // let isPro = process.env.NODE_ENV === 'production'
  // let tq = tqKit({
  //     ak: "bcbb1528f4dd5c5af330caa5ecf4125b",
  //     on: isPro
  // })
  // if (isPro) {
  //     Vue.config.errorHandler = tq.vueErrorHandler.bind(tq)
  // }
  // 页面切换关闭全屏组件
  router.afterEach(() => {
    try {
      Vue.$loading.close()
      Vue.$alert.close()
      Vue.$message.destroy()
      // Vue.$totast.close()
    } catch (e) { }
  })
}
