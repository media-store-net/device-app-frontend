/** @format */

import API from './index'

export default {
  getCompanies() {
    let params = new URLSearchParams()
    return API.get('/companies', params)
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
