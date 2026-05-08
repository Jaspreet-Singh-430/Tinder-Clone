import axios from "axios"
const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:5000":"/backend"
export const axiosInstance=axios.create(
    {
        baseURL:"http://localhost:5000/auth",
        withCredentials:true
    }
)