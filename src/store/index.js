import Vue from "vue";
import Vuex from "vuex";

import api from "../api/api";

//TODO make this imports dynamic, when they needed
import CompanyForm from "@/components/Forms/CompanyForm";
import PartsForm from "@/components/Forms/PartsForm";
import DoctypesForm from "@/components/Forms/DoctypesForm";
import DeviceForm from "@/components/Forms/DeviceForm";
import QrCode from "@/components/Devices/QrCode";
import Loader from "@/components/UI/Loader";

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
        scrollable: true
      }
    },
    PartsForm: {
      name: "PartsForm",
      component: PartsForm,
      attrs: {},
      props: {
        class: "parts-form",
        height: "auto",
        width: "60%",
        scrollable: true
      }
    },
    DoctypesForm: {
      name: "DoctypesForm",
      component: DoctypesForm,
      attrs: {},
      props: {
        class: "doctype-form",
        height: "auto",
        width: "60%",
        scrollable: true
      }
    },
    DeviceForm: {
      name: "DeviceForm",
      component: DeviceForm,
      attrs: {},
      props: {
        class: "DeviceForm",
        height: "auto",
        width: "95%",
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
    },
    Loader: {
      name: "Loader",
      component: "Loader"
    },
    MessageBox: {
      name: "MessageBox",
      component: "MessageBox",
      props: {
        type: ["success", "warning", "error"]
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
  // TODO Docs
  setCompanies: async ({ commit }) => {
    try {
      const res = await api.companies.get();
      commit("setCompanies", res.data);
    } catch (error) {
      // TODO Errors Component (maybe as modal)
      console.error(error);
    }
  },
  // TODO Docs
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
      // TODO Errors Component (maybe as modal)
      console.error(error);
    }
  },
  // TODO Docs
  newDoctype: async (context, payload) => {
    try {
      const res = await api.doctypes.post(payload);
      if (res.statusText !== "OK") {
        console.log("Something went wrong");
      } else {
        console.log("status OK");
        // copy parts array from state
        const doctypes = [...context.getters.doctypes];
        // push new item into array
        doctypes.push(res.data);
        // commit back to state
        context.commit("setDoctypes", doctypes);
      }
    } catch (error) {
      // TODO Errors Component (maybe as modal)
      console.error(error);
    }
  },
  // TODO Docs
  setDoctypes: async ({ commit }) => {
    try {
      const res = await api.doctypes.get();
      commit("setDoctypes", res.data);
    } catch (error) {
      // TODO Errors Component (maybe as modal)
      console.error(error);
    }
  },
  // TODO Docs
  newPart: async (context, payload) => {
    try {
      const res = await api.parts.post(payload);
      if (res.statusText !== "OK") {
        console.log("Something went wrong");
      } else {
        console.log("status OK");
        // copy parts array from state
        const parts = [...context.getters.parts];
        // push new item into array
        parts.push(res.data);
        // commit back to state
        context.commit("setParts", parts);
      }
    } catch (error) {
      // TODO Errors Component (maybe as modal)
      console.error(error);
    }
  },
  // TODO Docs
  setParts: async ({ commit }) => {
    try {
      const res = await api.parts.get();
      commit("setParts", res.data);
    } catch (error) {
      // TODO Errors Component (maybe as modal)
      console.error(error);
    }
  },
  // TODO Docs
  newFile: async (context, payload) => {
    try {
      // send new File to API
      // return the object
    } catch (error) {
      // TODO Errors Component (maybe as modal)
    }
  },
  // TODO Docs
  removeFile: async (context, payload) => {
    try {
      // send the id of file to remove from server
    } catch (error) {
      // TODO Errors Component (maybe as modal)
    }
  },
  // TODO Docs
  setFiles: async (context, payload) => {
    try {
      // get Files Array from API and sets to state (nedded only on the files page)
    } catch (error) {
      // TODO Errors Component (maybe as modal)
    }
  },
  // TODO Docs
  newDevice: async (context, payload) => {
    try {
      // send data to API
      const res = await api.devices.post(payload);
      if (res.statusText !== "OK") {
        console.log("Something went wrong");
      } else {
        // push device to devices array (this.pushDevice)
        context.dispatch("pushDevice", res.data);
      }
    } catch (error) {
      // TODO Errors Component (maybe as modal)
    }
  },
  // TODO Docs
  updateDevice: async (context, payload) => {
    try {
      // send data to API
      const res = await api.devices.put(payload);
      if (res.statusText !== "OK") {
        console.log("Something went wrong");
      } else {
        // TODO filter the device in the devices array
        console.log(res.data);
      }
    } catch (error) {
      // TODO Errors Component (maybe as modal)
    }
  },
  // TODO Docs
  removeDevice: async (context, payload) => {
    try {
      // send id to API
      const res = await api.devices.delete(payload);
      // remove from devices array
      if (res.statusText !== "OK") {
        console.log("Something went wrong");
      } else {
        // delete device in the devices array
        context.dispatch("spliceDevice", res.data);
      }
    } catch (error) {
      // TODO Errors Component (maybe as modal)
    }
  },
  // TODO Docs
  setDevices: async ({ commit }) => {
    try {
      const res = await api.devices.get();
      commit("setDevices", res.data);
    } catch (error) {
      console.error(error);
    }
  },
  // TODO Docs
  loginCustomer: async (context, payload) => {
    try {
      const res = await api.deviceLogin({ sn: payload.sn, pass: payload.pass });
      console.log(res);
      if (res.statusText !== "OK") {
        console.log("Something went wrong");
      }
      context.commit("setCurrentDevice", res.data);
    } catch (error) {
      console.error(error);
    }
  },
  // TODO Docs
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
  // Docs
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
    // payload is the device object from server
    const devices = [...context.getters.devices];
    devices.push(payload);
    context.commit("setDevices", devices);
  },
  spliceDevice: (context, payload) => {
    // payload is the device object from server
    const devices = [...context.getters.devices];
    const filteredDevices = devices.filter(dev => dev.id !== payload.id);
    context.commit("setDevices", filteredDevices);
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
