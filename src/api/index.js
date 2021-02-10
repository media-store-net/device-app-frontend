import axios from "axios"

// set baseUrl from .env file and export axios instance
export default axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
