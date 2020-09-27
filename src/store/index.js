import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authKey: '',
    companies: [],
    devices: [],
    doctypes: [],
    parts: [],
    currentDevice: {}
  },
  getters: {
    authKey: state => state.authKey,
    companies: state => state.companies,
    devices: state => state.devices,
    doctypes: state => state.doctypes,
    parts: state => state.parts,
    currentDevice: state => state.currentDevice
  },
  mutations: {
    setAuthKey: (state, payload) => state.authKey = payload,
    setCompanies: (state, payload) => state.companies = payload,
    setDevices: (state, payload) => state.devices = payload,
    setDoctypes: (state, payload) => state.doctypes = payload,
    setParts: (state, payload) => state.parts = payload,
    setCurrentDevice: (state, payload) => state.currentDevice = payload,
  },
  actions: {
    setAuthKey: ({ commit }, payload) => commit('setAuthKey', payload),
    setCompanies: ({ commit }, payload) => commit('setCompanies', payload),
    setDevices: ({ commit }, payload) => commit('setDevices', payload),
    setDoctypes: ({ commit }, payload) => commit('setDoctypes', payload),
    setParts: ({ commit }, payload) => commit('setParts', payload),
    setCurrentDevice: ({ commit }, payload) => commit('setCurrentDevice', payload),
  },
  modules: {
  }
})
