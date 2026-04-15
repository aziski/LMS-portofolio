import router from "@/router";
import axios, { Axios } from "axios";

const api = axios.create({
    withCredentials: true
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.status === 401) {
            router.push('/')
        }return Promise.reject(error)
    }
)

export default api;