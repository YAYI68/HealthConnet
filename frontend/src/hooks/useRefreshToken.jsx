// import { axiosInstance } from "../axios";
import { useAuthContext } from "../context/AuthContext";
import { axiosInstance } from "../utils/axios";

export default function useRefreshToken() {
    const { setAccessToken, setCSRFToken } = useAuthContext()

    const refresh = async () => {
        const response = await axiosInstance.post('/token/refresh/')
        setAccessToken(response.data.access)
        setCSRFToken(response.headers["X-CSRFToken"])

        return { accessToken: response.data.access, csrfToken: response.headers["X-CSRFToken"] }
    }

    return refresh
}