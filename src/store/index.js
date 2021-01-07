import Vue from "vue";
import Vuex from "vuex";

import api from "../api/api";

//TODO make this imports dynamic, when they needed
import {app} from "../main";
import CompanyForm from "@/components/Forms/CompanyForm";
import PartsForm from "@/components/Forms/PartsForm";
import DoctypesForm from "@/components/Forms/DoctypesForm";
import DeviceForm from "@/components/Forms/DeviceForm";
import QrCode from "@/components/Devices/QrCode";
import Loader from "@/components/UI/Loader";
import MessageBox from "@/components/UI/MessageBox";

Vue.use(Vuex);

export const state = {
	authKey: "",
	currentUser: null,
	isAuthenticated: false,
	companies: [],
	devices: [],
	files: [],
	doctypes: [],
	parts: [],
	currentDevice: {},
	modals: {
		CompanyForm: {
			component: CompanyForm,
			attrs: {},
			props: {
				name: "CompanyForm",
				class: "company-form",
				height: "auto",
				width: "60%",
				scrollable: true
			}
		},
		PartsForm: {
			component: PartsForm,
			attrs: {},
			props: {
				name: "PartsForm",
				class: "parts-form",
				height: "auto",
				width: "60%",
				scrollable: true
			}
		},
		DoctypesForm: {
			component: DoctypesForm,
			attrs: {},
			props: {
				name: "DoctypesForm",
				class: "doctype-form",
				height: "auto",
				width: "60%",
				scrollable: true
			}
		},
		DeviceForm: {
			component: DeviceForm,
			attrs: {},
			props: {
				name: "DeviceForm",
				class: "DeviceForm",
				height: "auto",
				width: "95%",
				scrollable: true
			}
		},
		QrCode: {
			component: QrCode,
			attrs: {},
			props: {
				name: "QrCode",
				class: "QrCode",
				height: "335px",
				width: "60%"
			}
		},
		Loader: {
			component: Loader,
			attrs: {},
			props: {
				name: "Loader",
				class: "loader",
				height: "100%",
				width: "100%"
			}
		},
		MessageBox: {
			component: MessageBox,
			attrs: {
				type: "success",
				message: "Hi, i`m the fallback Message"
			},
			props: {
				name: "MessageBox",
				class: "message-box",
				height: "30%",
				width: "50%"
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
	files: state => state.files,
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
	setFiles: (state, payload) => (state.files = payload),
	setDoctypes: (state, payload) => (state.doctypes = payload),
	setParts: (state, payload) => (state.parts = payload),
	setCurrentDevice: (state, payload) => (state.currentDevice = payload),
	setModals: (state, payload) => (state.modals = payload)
};

/**
 * @description VUEX Actions to commit the changes into the state via mutations
 * @type {{}}
 * @see https://vuex.vuejs.org/guide/actions.html
 */
export const actions = {
	/**
	 * @method showModal
	 * @description global method to call the $modal from the Vue-Instance
	 * @param {Object} context - Store Context
	 * @param {Object} payload - expected a Object {name: 'name of the modal from store-array', componentProps: {}}
	 */
	showModal: async (context, payload) => {
		const currentModal = context.getters.modals[payload.name];
		const componentProps = payload.componentProps;
		await app;
		if (currentModal) {
			app.$modal.show(
				currentModal.component,
				{...currentModal.attrs, ...componentProps},
				currentModal.props
			);
		}
	},
	/**
	 * @method hideModal
	 * @description global method to close the $modal from the Vue-Instance
	 * @param {Object} _ - Store Context (not used)
	 * @param {String} payload - expected a modal name as string
	 */
	hideModal: async (_, name) => {
		await app;
		app.$modal.hide(name);
	},
	/**
	 * @method hideAllModals
	 * @description global method to close all active $modals from the Vue-Instance
	 */
	hideAllModals: async () => {
		await app;
		app.$modal.hideAll();
	},
	/**
	 * @method setCompanies
	 * @description global method to call the companies from API and set to Store
	 * @param {Object} context - vuex default context obejct
	 * @returns {Promise<void>}
	 * @throws Error
	 */
	setCompanies: async context => {
		try {
			const res = await api.companies.get();
			context.commit("setCompanies", res.data);
		} catch (error) {
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.code} - <br> Companies konnten nicht abgerufen werden`
				}
			});
		}
	},
	/**
	 * @method newCompanie
	 * @description method to send one new Companie to the API and push to the companies array in the Store
	 * @param {Object} context - vuex default context obejct
	 * @param payload
	 * @returns {Promise<void>}
	 * @throws Error
	 */
	newCompanie: async (context, payload) => {
		try {
			const res = await api.companies.post(payload);
			if (res.statusText !== "OK") {
				console.log(res);
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
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.message} - Firma konnte nicht gespeichert werden`
				}
			});
		}
	},
	/**
	 * @method newDoctype
	 * @description method to send one new Doctype Object to API and push it to Doctypes-Array
	 * @param {Object} context - vuex default context obejct
	 * @param payload
	 * @returns {Promise<void>}
	 * @throws Error
	 */
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
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.message} - Doctype konnte nicht gespeichert werden`
				}
			});
		}
	},
	/**
	 * @method setDoctypes
	 * @description call the doctypes from API and set to Store
	 * @param {Object} context - vuex default context object
	 * @returns {Promise<void>}
	 */
	setDoctypes: async context => {
		try {
			const res = await api.doctypes.get();
			context.commit("setDoctypes", res.data);
		} catch (error) {
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.message} - Doctypes konnten nicht geladen werden`
				}
			});
		}
	},
	/**
	 * @method newPart
	 * @description send a new Part Object to the API and push to the store
	 * @param {Object} context - vuex default context object
	 * @param payload
	 * @returns {Promise<void>}
	 * @throws Error
	 */
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
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.message} - Artikelnummer konnte nicht gespeichert werden`
				}
			});
		}
	},
	/**
	 * @method setParts
	 * @description call the parts from API an set to store
	 * @param {Object} context - vuex default context object
	 * @returns {Promise<void>}
	 * @throws Error
	 */
	setParts: async (context) => {
		try {
			const res = await api.parts.get();
			context.commit("setParts", res.data);
		} catch (error) {
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.message} - Artikelnummern konnten nicht geladen werden`
				}
			});
		}
	},
	// TODO fullfill the method and Docs
	newFile: async (context, payload) => {
		try {
			// send new File to API
			// return the object
		} catch (error) {
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.message} - Datei konnte nicht gespeichert werden`
				}
			});
		}
	},
	// TODO fullfill the method and Docs
	removeFile: async (context, payload) => {
		try {
			// send the id of file to remove from server
		} catch (error) {
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.message} - Datei konnte nicht gelöscht werden`
				}
			});
		}
	},
	/**
	 * @method setFiles
	 * @description get Files Array from API and sets to state (needed only on the files page and files modal)
	 * @param {Object} context - vuex default context object
	 * @returns {Promise<void>}
	 */
	setFiles: async context => {
		try {
			const res = await api.files.get();
			if (res.statusText !== "OK") {
				// Show MessageBox
				context.dispatch("showModal", {
					name: "MessageBox",
					componentProps: {
						type: "warning",
						message: "Something went wrong! Try again later"
					}
				});
				console.log("Something went wrong! Try again later");
			} else {
				context.commit("setFiles", res.data);
			}
		} catch (error) {
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.message} - Dateien konnten nicht geladen werden`
				}
			});
		}
	},
	/**
	 * @method newDevice
	 * @description send a new Device Object to API and push into devices array in the store
	 * @param {Object} context - vuex default context object
	 * @param payload
	 * @returns {Promise<void>}
	 * @throws Error
	 */
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
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.message} - Gerät konnte nicht gespeichert werden`
				}
			});
		}
	},
	/**
	 * @method updateDevice
	 * @description update an device object to API the changes in the store reflects through currentDevice state
	 * @param {Object} context - vuex default context object
	 * @param {Object} payload - expected an object
	 * @returns {Promise<void>}
	 * @throws Error
	 */
	updateDevice: async (context, payload) => {
		try {
			// send data to API
			const res = await api.devices.put(payload);
			if (res.statusText !== "OK") {
				console.log("Something went wrong");
			} else {
				// filter the device in the devices array
				console.log(res.data);
			}
		} catch (error) {
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.message} - Gerät konnte nicht aktualisiert werden`
				}
			});
		}
	},
	/**
	 * @method removeDevice
	 * @description remove one device on server through the given deviceId
	 * @param {Object} context - vuex default context object
	 * @param {Number} payload - the deviceId to delete from server
	 * @returns {Promise<void>}
	 * @throws Error
	 */
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
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.message} - Gerät konnte nicht gelöscht werden`
				}
			});
		}
	},
	/**
	 * @method setDevices
	 * @description call the devices from API and set into the store
	 * @param commit
	 * @returns {Promise<void>}
	 */
	setDevices: async ({commit}) => {
		try {
			const res = await api.devices.get();
			commit("setDevices", res.data);
		} catch (error) {
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.message} - Geräte konnten nicht geladen werden`
				}
			});
		}
	},
	/**
	 * @method loginCustomer
	 * @description send the customer user login data to API
	 * @param {Object} context - vuex default context object
	 * @param {Object} payload - expected keys "sn":String && "pass":String
	 * @returns {Promise<void>}
	 * @throws Error
	 */
	loginCustomer: async (context, payload) => {
		try {
			const res = await api.deviceLogin({sn: payload.sn, pass: payload.pass});
			console.log(res);
			if (res.statusText !== "OK") {
				console.log("Something went wrong");
			}
			context.commit("setCurrentDevice", res.data);
		} catch (error) {
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.message} - Login derzeit nicht möglich`
				}
			});
		}
	},
	/**
	 * @method loginUser
	 * @description send the login user data from a admin user to API
	 * @param {Object} context - vuex default context object
	 * @param {Object} payload - expected keys "username": String, "password": String
	 * @returns {Promise<void>} - JWT Token || Server-Error
	 */
	loginUser: async (context, payload) => {
		try {
			const res = await api.userLogin({
				identifier: payload.username,
				password: payload.pass
			});
			if (res.statusText !== "OK") {
				// Show MessageBox
				context.dispatch("showModal", {
					name: "MessageBox",
					componentProps: {
						type: "warning",
						message: `Fehler: ${res.error.message} - Login derzeit nicht möglich`
					}
				});
				console.log(res);
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
			// Show error messageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "error",
					message: `Fehler: ${error.message} - Login derzeit nicht möglich`
				}
			});
		}
	},
	/**
	 * @method logoutUser
	 * @description logout the admin user, remove the AuthKey (JWT Token) and clear the localStorage
	 * @param {Object} context - vuex default context object
	 * @returns {Promise<void>} - redirect to login view or Error
	 * @throws Error
	 */
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
			// Show MessageBox
			context.dispatch("showModal", {
				name: "MessageBox",
				componentProps: {
					type: "warning",
					message: `Fehler: ${error.message} - Logout fehlgeschlagen`
				}
			});
		}
	},
	/**
	 * @method pushDevice
	 * @description method to push one device object to the devices-array in the store
	 * @param {Object} context - vuex default context object
	 * @param payload - device object
	 */
	pushDevice: (context, payload) => {
		// payload is the device object from server
		const devices = [...context.getters.devices];
		devices.push(payload);
		context.commit("setDevices", devices);
	},
	/**
	 * @method spliceDevice
	 * @description remove one device object from the devices-array in the store
	 * @param {Object} context - vuex default context object
	 * @param {Object} payload - is the device object from server that should be removed
	 */
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
	setModals: ({commit}, payload) => commit("setModals", payload),
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
export default function makeStore() {
	return new Vuex.Store({
		state,
		getters,
		mutations,
		actions,
		modules
	});
}
