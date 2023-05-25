import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import { axiosPrivateInstance } from "../utils/axios"



export default function useLogout() {
    const { setUser, setAccessToken, setCSRFToken } = useAuthContext()
    const navigate = useNavigate()

    const logout = async () => {
        try {
            const response = await axiosPrivateInstance.post("/logout/")
            setAccessToken(null)
            setCSRFToken(null)
            setUser(null)
            navigate('/login')

        } catch (error) {
            console.log(error)
        }
    }

    return logout
}