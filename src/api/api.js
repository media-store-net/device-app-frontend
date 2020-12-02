import API from './index'

export default {
  setAuthHeader(token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  removeAuthHeader() {
    delete API.defaults.headers.common["Authorization"];
  },
  companies: {
    get() {
      let params = new URLSearchParams()
      return API.get('/companies', params)
    },
    post(data) {
      return API.post('/companies', data)
    },
    put(data) {
      return API.put('/companies', { data: data, headers: header })
    },
    delete(id) {
      return API.put('/companies', { data: id, headers: header })
    }
  },
  getDiveces() {
    let params = new URLSearchParams()
    return API.get('/devices', params)
  },
  getDoctypes() {
    let params = new URLSearchParams()
    return API.get('/doctypes ', params)
  },
  getParts() {
    let params = new URLSearchParams()
    return API.get('/parts', params)
  },
  deviceLogin(params) {
    return API.post('/devices/customer-login', params)
  },
  userLogin(params) {
    return API.post('/auth/local', params)
  }
}
