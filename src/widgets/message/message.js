import Message from './index.vue'

const MESSAGE = {
  duration: 3000, // 显示的时间 ms
  animateTime: 300, // 动画时间,表示这个组件切换show的动画时间
  closequeue: [],
  install (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    // 生命组件  render 使用
    Vue.component('msg', Message)

    let msg = (type, text) => {
      return new Promise((resolve, reject) => {
        let msg
        let duration = MESSAGE.duration
        if (typeof text === 'string') {
          msg = text
        } else if (text instanceof Object) {
          msg = text.text || ''
          if (text.duration) {
            duration = text.duration
          }
        }
        let VueMessage = Vue.extend({
          render (h) {
            // console.log(this);
            let props = {
              type,
              text: msg,
              show: this.show
            }
            return h('msg', { props })
          },
          data () {
            return {
              show: false
            }
          }
        })
        let newMessage = new VueMessage()
        let vm = newMessage.$mount()
        let el = vm.$el
        document.body.appendChild(el) // 把生成的提示的dom插入body中
        vm.show = true
        let t1 = ''
        let t2 = ''
        t1 = setTimeout(() => {
          clearTimeout(t1)
          vm.show = false // 隐藏提示组件，此时会有300ms的动画效果，等动画效果过了再从body中移除dom
          t2 = setTimeout(() => {
            clearTimeout(t2)
            newMessage.$destroy()

            vm = null // 设置为null，好让js垃圾回收算法回收，释放内存

            resolve()
          }, MESSAGE.animateTime)
        }, duration)

        this.closequeue.push(() => {
          vm.show = false
          Vue.$nextTick(() => {
            clearTimeout(t1)
            newMessage.$destroy()
            vm = null
            t2 && clearTimeout(t2)
          })
        })
      })
    }

    // 挂载到vue原型上，暴露四个方法
    Vue.$message = Vue.prototype.$message = {
      info (text, callBack) {
        if (!text) return
        return msg('info', text)
      },
      success (text, callBack) {
        if (!text) return
        return msg('success', text)
      },
      error (text, callBack) {
        if (!text) return
        return msg('error', text)
      },
      warning (text, callBack) {
        if (!text) return
        return msg('warning', text)
      },
      destroy () {
        MESSAGE.closequeue.forEach(a => a())
      }
    }
  }
}
export default MESSAGE
