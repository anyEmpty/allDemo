import {
  SET_SESSION,
  INIT_STORAGE
} from '../mutation-types';

// commit 函数
const commitStore = (commit, obj) => {
  let storage = obj.storage; // 是否存储 session

  for (let key in obj) {
    if (key === 'storage') {
      return;
    }

    let value = obj[key];

    try {
      value = (typeof value === 'string' || !storage) ? value : JSON.stringify(value);
    } catch (err) {
      throw new Error(`存储的 ${key} 的值必须为字符串格式`);
    }

    if (value && (value.length / 1024).toFixed(2) > 500) {
      if (storage) {
        throw new Error(`存储的 ${key} 值大小超过 500KB 限制，存储失败`);
      }

      console.warn(`存储的 ${key} 值大小超过 500KB`);
    }

    commit(SET_SESSION, {
      key,
      value,
      storage,
    });
  }
};

const state = {};

const getters = {};

const actions = {
  // session存储方法
  setSessionStorage: ({
    commit
  }, obj) => {
    commitStore(commit, obj);
  },
  // 初始化存储方法
  initStorage: ({
    commit
  }, obj) => {
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        commit(INIT_STORAGE, {
          key,
          value: obj[key]
        });
      }
    }
  }
};

const mutations = {
  [SET_SESSION]: (states, data) => {
    states[data.key] = data.value;

    data.storage && sessionStorage.setItem(data.key, data.value);
  },
  [INIT_STORAGE]: (states, data) => {
    states[data.key] = data.value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
