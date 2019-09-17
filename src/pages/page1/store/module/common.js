import {
  TEXT
} from '../mutation-types'

const state = {
  text: ''
}

const getters = {
  text: (state) => {
    return state.text
  }
}

const actions = {
  // 获取历史查询数据
  setText: ({
    commit
  }, data) => {
    commit(TEXT, data)
  }
}

const mutations = {
  [TEXT]: (state, data) => {
    state.text = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
