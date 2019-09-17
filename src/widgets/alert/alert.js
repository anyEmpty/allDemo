import Vue from 'vue'
import Alert from './index.vue'

const AlertConstructor = Vue.extend(Alert)

let instance
let currentAlert
let alertQueue = []
let defaultCallback = () => {
  console.log(2)
  instance.show = false
  instance = null
  currentAlert = null
  alertQueue = []
}
let initInstance = () => {
  instance = new AlertConstructor({
    el: document.createElement('div')
  })
  console.log('出发了')
  instance.onHide = defaultCallback
}

let showAlert = () => {
  let arr = ['html', 'buttonText']
  if (!instance) {
    initInstance()
  }
  if (alertQueue.length > 0 && !currentAlert) {
    currentAlert = alertQueue.shift()
    arr.forEach((prop) => {
      instance[prop] = currentAlert[prop]
    })
    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.show = true
    })
  }
}

let AlertBox = ({message, buttonText}) => {
  AlertBox.close()
  return new Promise((resolve, reject) => {
    if (!message) {
      reject(new Error('something bad happened'))
      return
    }
    alertQueue.push({
      html: message,
      buttonText: buttonText || 'i know',
      resolve: resolve
    })
    showAlert()
  })
}
AlertBox.close = () => {
  if (!instance) return
  instance.show = false
  currentAlert = null
  alertQueue = []
}
export default AlertBox
