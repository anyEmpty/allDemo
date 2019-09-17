import Vue from 'vue'
import Loading from './index.vue'

const LoadingConstructor = Vue.extend(Loading)

let instance
let initInstance = () => {
  instance = new LoadingConstructor({
    el: document.createElement('div')
  })
}

let showLoading = (opts) => {
  LoadingBox.close()
  if (!instance) {
    initInstance()
  }
  // let arr = ['text']
  instance['text'] = opts['text'] && opts['text']
  document.body.appendChild(instance.$el)
  instance.loadingIsClose = false
  Vue.nextTick(() => {
    if (!instance.loadingIsClose) {
      instance.show = true
    }
  })
}

let LoadingBox = ({text}) => {
  showLoading({text})
}
LoadingBox.close = () => {
  if (!instance) return ''
  instance.show = false
  instance.loadingIsClose = true
  try {
    document.body.removeChild(instance.$el)
  } catch (e) {

  }
}

export default LoadingBox
