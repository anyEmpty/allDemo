import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/store/module/storage'

import common from './module/common'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    storage,
    common
  }
})

export default store
