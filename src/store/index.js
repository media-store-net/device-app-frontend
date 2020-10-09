import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api/api'

//TODO make this imports dynamic, when they needed
import DeviceForm from '@/components/DeviceForm';
import QrCode from '@/components/QrCode';


Vue.use(Vuex)

export const state = {
  authKey: '',
  companies: [],
  devices: [],
  doctypes: [],
  parts: [],
  currentDevice: {},
  modals: {
    DeviceForm: {
      name: 'DeviceForm',
      component: DeviceForm,
      attrs: {},
      props: {
        class: 'DeviceForm',
        height: 'auto',
        width: '700px',
        scrollable: true,
      },
    },
    QrCode: {
      name: 'QrCode',
      component: QrCode,
      attrs: {},
      props: {
        class: 'QrCode',
        height: '99%',
        width: '700px',
      },
    },
  }
};

export const getters = {
  authKey: state => state.authKey,
  companies: state => state.companies,
  devices: state => state.devices,
  doctypes: state => state.doctypes,
  parts: state => state.parts,
  currentDevice: state => state.currentDevice,
  modals: state => state.modals
};

export const mutations = {
  setAuthKey: (state, payload) => state.authKey = payload,
  setCompanies: (state, payload) => state.companies = payload,
  setDevices: (state, payload) => state.devices = payload,
  setDoctypes: (state, payload) => state.doctypes = payload,
  setParts: (state, payload) => state.parts = payload,
  setCurrentDevice: (state, payload) => state.currentDevice = payload,
  setModals: (state, payload) => state.modals = payload
}

export const actions = {
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
  setModals: ({ commit }, payload) => commit('setModals', payload),
}

export const modules = {
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
