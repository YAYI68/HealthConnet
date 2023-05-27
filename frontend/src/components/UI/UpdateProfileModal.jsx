import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

function UpdateProfileModal() {
    const {user } = useAuthContext()
    const{ setUpdateModal,modalMessage,setModalMessage } = useAppContext()
    const navigate = useNavigate()

    const updateRoute = ()=>{
        setUpdateModal(false)
        navigate('/dashboard/profile/edit')
    }
    const cancel = ()=>{
        setUpdateModal(false)
        setModalMessage('')
    }
  return (
    <div  className='w-full min-h-screen  z-[20] fixed '>
    <div onClick={()=>cancel()} className='absolute h-full w-full backdrop-blur-md bg-white/30 '></div>
       <div className='w-full h-full relative'>
        <div className=' w-[20rem] p-2 lg:w-[25rem]  flex flex-col gap-6 items-center shadow-md rounded-md border-primary border bg-secondary absolute top-[5rem] left-1/2 -translate-x-1/2 '>
          <p className='text-[2rem] font-bold text-center'>Hello <span className='text-primary'>{user.firstname}</span></p>
          <p className='text-[1.2rem] font-semibold'>{modalMessage}</p>
         <div className='w-full flex justify-between'>
            <button onClick={()=>cancel()} className='p-2 border border-primary w-[40%] text-primary rounded-md'>Cancle</button>
            <button onClick={()=>updateRoute()} className='p-2 bg-primary w-[40%] text-white border text-center border-primary rounded-md'>UpdateProfile</button>
         </div>
        </div>
       </div>
    </div>
  )
}

export default UpdateProfileModal

