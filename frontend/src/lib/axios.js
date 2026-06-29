import axios from "axios"
const BASE_URL=import.meta.env.VITE_SERVER_URL
export const axiosInstance=axios.create(
    {
        baseURL:import.meta.env.VITE_MODE=="development" ? 
        `${BASE_URL}/auth`:"/auth",
        withCredentials:true
    }
)