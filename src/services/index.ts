import axios from "axios"

export const API_URL = "https://quanly.exxe.vn"
// const API_LINK = "172.16.0.48"
// export const API_URL = `http://${API_LINK}:1234`
// export const IMAGE_URL = API_URL

export const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL

const axiosClient = axios.create({
  baseURL: API_URL,
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

axiosClient.interceptors.request.use(async (config) => {
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response?.data) {
      return response.data
    }
    return response
  },
  (err) => {
    throw err
  }
)

export default axiosClient
export * from "./userApi"
export * from "./addressApi"
export * from "./chatApi"
export * from "./vehicleApi"
export * from "./ridesApi"
