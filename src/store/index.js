// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
import getters from './getters'
import modules from './modules'

const store = new Vuex.Store({
  modules,
  getters
})

export default store
