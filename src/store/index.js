import Vue from "vue";
import Vuex from "vuex";

import axios from "../api/index";
import api from "../api/api";

//TODO make this imports dynamic, when they needed
import CompanyForm from "../components/CompanyForm";
import DeviceForm from "@/components/DeviceForm";
import QrCode from "@/components/QrCode";

Vue.use(Vuex);

export const state = {
  authKey: "",
  currentUser: null,
  isAuthenticated: false,
  companies: [],
  devices: [],
  doctypes: [],
  parts: [],
  currentDevice: {},
  modals: {
    CompanyForm: {
      name: "CompanyForm",
      component: CompanyForm,
      attrs: {},
      props: {
        class: "company-form",
        height: "auto",
        width: "60%",
        scrollable: false
      }
    },
    DeviceForm: {
      name: "DeviceForm",
      component: DeviceForm,
      attrs: {},
      props: {
        class: "DeviceForm",
        height: "auto",
        width: "700px",
        scrollable: true
      }
    },
    QrCode: {
      name: "QrCode",
      component: QrCode,
      attrs: {},
      props: {
        class: "QrCode",
        height: "335px",
        width: "60%"
      }
    }
  }
};

export const getters = {
  authKey: state => state.authKey,
  currentUser: state => state.currentUser,
  isAuthenticated: state => state.isAuthenticated,
  companies: state => state.companies,
  devices: state => state.devices,
  doctypes: state => state.doctypes,
  parts: state => state.parts,
  currentDevice: state => state.currentDevice,
  modals: state => state.modals
};

export const mutations = {
  setAuthKey: (state, payload) => {
    state.authKey = payload;
    api.setAuthHeader(payload);
  },
  setCurrentUser: (state, payload) => (state.currentUser = payload),
  setAuthenticated: (state, payload) => (state.isAuthenticated = payload),
  setCompanies: (state, payload) => (state.companies = payload),
  setDevices: (state, payload) => (state.devices = payload),
  setDoctypes: (state, payload) => (state.doctypes = payload),
  setParts: (state, payload) => (state.parts = payload),
  setCurrentDevice: (state, payload) => (state.currentDevice = payload),
  setModals: (state, payload) => (state.modals = payload)
};

/**
 * @description VUEX Actions to commit the changes into the state via mutations
 */
export const actions = {
  setCompanies: async ({ commit }) => {
    try {
      const res = await api.companies.get();
      commit("setCompanies", res.data);
    } catch (error) {
      console.error(error);
    }
  },
  newCompanie: async (context, payload) => {
    try {
      const res = await api.companies.post(payload);
      if (res.statusText !== "OK") {
        console.log("Something went wrong");
      } else {
        console.log("status OK");
        // copy companies array from state
        const companies = [...context.getters.companies];
        // push new item into array
        companies.push(res.data);
        // commit back to state
        context.commit("setCompanies", companies);
      }
    } catch (error) {
      console.error(error);
    }
  },
  setDevices: async ({ commit }) => {
    try {
      const res = await api.getDiveces();
      commit("setDevices", res.data);
    } catch (error) {
      console.error(error);
    }
  },
  setDoctypes: async ({ commit }) => {
    try {
      const res = await api.getDoctypes();
      commit("setDoctypes", res.data);
    } catch (error) {
      console.error(error);
    }
  },
  setParts: async ({ commit }) => {
    try {
      const res = await api.getParts();
      commit("setParts", res.data);
    } catch (error) {
      console.error(error);
    }
  },
  loginCustomer: async (context, payload) => {
    try {
      const res = await api.deviceLogin({
        sn: payload.sn,
        pass: payload.pass.toString()
      });
      console.log(res);
      if (res.statusText !== "OK") {
        console.log("Something went wrong");
      }
      context.commit("setCurrentDevice", res.data);
    } catch (error) {
      console.error(error);
    }
  },
  loginUser: async (context, payload) => {
    try {
      const res = await api.userLogin({
        identifier: payload.username,
        password: payload.pass
      });
      if (res.statusText !== "OK") {
        console.log("Something went wrong");
      }

      if (res.data.user) {
        context.commit("setCurrentUser", res.data.user);
        context.commit("setAuthenticated", true);
      }
      if (res.data.jwt) {
        // Add a Auth token to default headers
        context.commit("setAuthKey", res.data.jwt);
      }
      localStorage.setItem(
        "pw_userinfo",
        JSON.stringify({
          currentUser: res.data.user,
          isAuthenticated: true,
          authKey: res.data.jwt
        })
      );
    } catch (error) {
      console.error(error);
    }
  },
  logoutUser: async context => {
    try {
      // remove localstorage item
      localStorage.removeItem("pw_userinfo");
      // remove auth headers
      api.removeAuthHeader();
      // set the state
      context.commit("setCurrentUser", null);
      context.commit("setAuthKey", "");
      context.commit("setAuthenticated", false);
    } catch (error) {
      console.error(error);
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
    if (payload && payload["deviceId"]) {
      device = context.getters.devices.find(dev => dev.id === payload.deviceId);
    } else {
      device = payload;
    }
    context.commit("setCurrentDevice", device);
  },
  setModals: ({ commit }, payload) => commit("setModals", payload),
  genPass: (_, payload) => {
    let hash = 0;

    if (payload === "") return hash;

    for (let i = 0; i < payload.length; i++) {
      const char = payload.charCodeAt(i);
      hash = (hash << 3) - hash + char;
      hash = hash & hash;
    }

    return hash;
  }
};

export const modules = {};

/**
 * @description Export of VUEX Store Instance
 */
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
});
