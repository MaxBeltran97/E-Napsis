import axios from "axios"
import { getEnvVariables } from "@helpers"

const { VITE_API_URL } = getEnvVariables()

const enapsisApi = axios.create({
  baseURL: VITE_API_URL
})

enapsisApi.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    // 'Content-Type': 'application/json',
    'x-token': localStorage.getItem('token')
  }

  return config
})

export default enapsisApi