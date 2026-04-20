import axios from "axios"
export const axiosInstance=axios.create(
    {
        baseURL:"http://localhost:5000/auth",
        withCredentials:true
    }
)