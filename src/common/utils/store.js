const dispathStore = ({
  param,
  storage,
  check,
  cb
} = {}) => {
  let state = window.store.state.storage // 数据 module

  if (Object.prototype.toString.call(param) === '[object Object]' && !check) {
    window.store.dispatch('setSessionStorage', {
      ...param,
      storage
    })
    return
  }

  /* if (storage) {
      throw new Error('传入该方法的第一个参数需为对象类型');
  } */

  if (typeof param === 'string') {
    // key 不存在且校验数据有效性时触发
    if (!Object.prototype.hasOwnProperty.call(state, param) && check) {
      if (cb) {
        cb()
        return
      }
      window.catcheCB()
      return
    }

    // 获取 session 或 local 中的值，从 vuex 中取
    return state[param]
  }

  if (check) {
    throw new Error('传入该方法的第一个参数需为字符串类型')
  }

  if (param === undefined) {
    return state
  }

  throw new Error('传入该方法的第一个参数赋值需为对象，取值需为字符串类型')
}

// 存储 session 方法，同步存储 vuex
const session = param => dispathStore({
  param,
  storage: true
})

// 存取 vuex 方法，获取数据不进行有效性校验
const vuex = param => dispathStore({
  param,
  storage: false
})

// 获取 vuex 方法，进行有效性校验
const vuexs = (param, cb) => dispathStore({
  param,
  storage: false,
  check: true,
  cb
})

// 初始化获取 session 及 local 存储到 vuex 中
const initStorage = ({
  Vue,
  cb
} = {}) => {
  // 原型链挂载
  Vue.prototype.$session = session
  Vue.prototype.$vuex = vuex
  Vue.prototype.$vuexs = vuexs

  window.catcheCB = cb

  // 将所有 session 存储到 vuex 中
  window.store.dispatch('initStorage', window.sessionStorage || {})
}

export {
  // vuex,
  // vuexs,
  // session,
  initStorage
}
