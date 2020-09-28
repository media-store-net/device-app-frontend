import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api/api'

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
    setCompanies: async ({ commit }) => {
      try {
        const res = await api.getCompanies();
        commit('setCompanies', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    setDevices: async ({ commit }) => {
      try {
        const res = await api.getDiveces()
        commit('setDevices', res.data)
      }
      catch (error) {
        console.error(error)
      }
    },
    setDoctypes: async ({ commit }) => {
      try {
        const res = await api.getDoctypes();
        commit('setDoctypes', res.data)
      }
      catch (error) {
        console.error(error);
      }
    },
    setParts: ({ commit }, payload) => commit('setParts', payload),
    setCurrentDevice: ({ commit }, payload) => commit('setCurrentDevice', payload),
  },
  modules: {
  }
})
