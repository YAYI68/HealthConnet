// import useAuth from "./useAuth"
// import useAxiosPrivate from "./useAxiosPrivate"

import { useAuthContext } from "../context/AuthContext"
import useAxiosPrivate from "./useAxiosPrivate"

export default function useUser() {

    const { setUser } = useAuthContext()
    const axiosPrivateInstance = useAxiosPrivate()

    async function getUser() {
        try {
            const { data } = await axiosPrivateInstance.get('/user/')
            setUser(data)
        } catch (error) {
            console.log(error.response)
        }
    }

    return getUser
}