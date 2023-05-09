
import { useAuthContext } from '../../context/AuthContext'
import { DOCTOR, PATIENT } from '../../utils/constant'

function RolesRoute({doctor,patient}) {
    const {user} = useAuthContext()
    if (user.role === DOCTOR){
        return doctor
    }
    else if (user.role === PATIENT){
       return patient
    }
}

export default RolesRoute