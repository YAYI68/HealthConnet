import axios from "axios";
import { BASE_URL } from "./constant";

export const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export const axiosPrivateInstance = axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})




