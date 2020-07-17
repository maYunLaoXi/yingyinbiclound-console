import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import user from './module/user'
import app from './module/app'
import wx from './module/wx'
import wxPersist from './module/wx-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer (val) {
    return {
      wxPersist: val.wxPersist
    }
  }
})
export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    wx,
    wxPersist
  },
  plugins: [vuexLocal.plugin]
})
