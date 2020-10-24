/** @format */

import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api/api'

//TODO make this imports dynamic, when they needed
import DeviceForm from '@/components/DeviceForm'
import QrCode from '@/components/QrCode'

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
        height: '280px',
        width: '60%',
      },
    },
  },
}

export const getters = {
  authKey: (state) => state.authKey,
  companies: (state) => state.companies,
  devices: (state) => state.devices,
  doctypes: (state) => state.doctypes,
  parts: (state) => state.parts,
  currentDevice: (state) => state.currentDevice,
  modals: (state) => state.modals,
}

export const mutations = {
  setAuthKey: (state, payload) => (state.authKey = payload),
  setCompanies: (state, payload) => (state.companies = payload),
  setDevices: (state, payload) => (state.devices = payload),
  setDoctypes: (state, payload) => (state.doctypes = payload),
  setParts: (state, payload) => (state.parts = payload),
  setCurrentDevice: (state, payload) => (state.currentDevice = payload),
  setModals: (state, payload) => (state.modals = payload),
}

/**
 * @description VUEX Actions to commit the changes into the state via mutations
 */
export const actions = {
  setAuthKey: ({ commit }, payload) => commit('setAuthKey', payload),
  setCompanies: async ({ commit }) => {
    try {
      const res = await api.getCompanies()
      commit('setCompanies', res.data)
    } catch (error) {
      console.error(error)
    }
  },
  setDevices: async ({ commit }) => {
    try {
      const res = await api.getDiveces()
      commit('setDevices', res.data)
    } catch (error) {
      console.error(error)
    }
  },
  setDoctypes: async ({ commit }) => {
    try {
      const res = await api.getDoctypes()
      commit('setDoctypes', res.data)
    } catch (error) {
      console.error(error)
    }
  },
  setParts: async ({ commit }) => {
    try {
      const res = await api.getParts();
      commit('setParts', res.data)
    } catch (error) {
      console.error(error)
    }
  },
  pushDevice: (context, payload) => {
    context.state.devices.push(payload);
  },
  /**
   * @method setCurrentDevice
   * @description find the device with the given ID in the devices array and set the state.currentDevice
   * @param {Object} payload given {deviceId: x} of one device object or completed device-object from devices array
   */
  setCurrentDevice: (context, payload = {}) => {
    let device = {};
    if (payload && payload['deviceId']) {
      device = context.getters.devices.find(dev => dev.id === payload.deviceId);
    }
    else {
      device = payload
    }
    context.commit('setCurrentDevice', device);
  },
  setModals: ({ commit }, payload) => commit('setModals', payload),
}

export const modules = {}

/**
 * @description Export of VUEX Store Instance
 */
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
})
