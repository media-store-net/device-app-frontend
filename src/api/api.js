import API from "./index";

export default {
	setAuthHeader(token) {
		API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	},
	removeAuthHeader() {
		delete API.defaults.headers.common["Authorization"];
	},
	companies: {
		get() {
			let params = new URLSearchParams();
			return API.get("/companies", params);
		},
		post(data) {
			return API.post("/companies", data);
		},
		put(data) {
			return API.put('/companies', data)
		},
		delete(id) {
			return API.put('/companies', id)
		}
	},
	upload: {
		get() {
			let params = new URLSearchParams();
			return API.get("/upload", params);
		},
		post(data) {
			return API.post("/upload", data);
		},
		put(data) {
			return API.put('/upload', data)
		},
		delete(id) {
			return API.put('/upload', id)
		}
	},
	files: {
		get() {
			let params = new URLSearchParams();
			return API.get("/files", params);
		},
		post(file) {
			return API.post("/files", file);
		},
		put(file) {
			return API.put('/files', file)
		},
		delete(id) {
			return API.put('/files/' + id)
		}
	},
	devices: {
		get() {
			let params = new URLSearchParams();
			return API.get("/devices", params);
		},
		post(device) {
			// Convert Objects to only Ids
			device.part = [device.part.id];
			device.companie = [device.companie.id];
			return API.post("/devices", device);
		},
		put(device) {
			// Convert Objects to only Ids
			device.part = [device.part.id];
			device.companie = [device.companie.id];
			return API.put(`/devices/${device.id}`, device)
		},
		delete(id) {
			return API.delete('/devices/' + id)
		}
	},

	doctypes: {
		get() {
			let params = new URLSearchParams();
			return API.get("/doctypes ", params);
		},
		post(data) {
			return API.post("/doctypes", data);
		},
		put(data) {
			return API.put('/doctypes', data)
		},
		delete(id) {
			return API.put('/doctypes', id)
		}
	},
	parts: {
		get() {
			let params = new URLSearchParams();
			return API.get("/parts", params);
		},
		post(data) {
			return API.post("/parts", data);
		},
		put(data) {
			return API.put('/parts', data)
		},
		delete(id) {
			return API.put('/parts', id)
		}
	},
	deviceLogin(params) {
		return API.post("/devices/customer-login", params);
	},
	userLogin(params) {
		return API.post("/auth/local", params);
	}
};
