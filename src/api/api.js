/** @format */

import API from "./index"

export default {
  getDiveces() {
    let params = new URLSearchParams()
    return API.get("/devices", params)
  },
  getDoctypes() {
    let params = new URLSearchParams()
    return API.get("/doctypes ", params)
  }
}
