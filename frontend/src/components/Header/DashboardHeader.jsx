import React from 'react'
import { BsBellFill } from 'react-icons/bs'
import { ImSearch } from 'react-icons/im';
import DefaultImg from "../../assets/images/default.png";
import { HiOutlineBars3BottomRight } from 'react-icons/hi2';
import { useAuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/constant';

function DashboardHeader({setSlide}) {
  const { accessToken,user } = useAuthContext()
  const authUser = !!accessToken
  return (
        <div className='w-full h-full flex justify-between items-center '>
           <button onClick={()=>setSlide(true)} type="button" className="h-[3rem] w-[3rem] xl:hidden flex items-center justify-center">
            <HiOutlineBars3BottomRight className="h-[80%] w-[80%] text-primary" />
           </button> 
           
           <div className='w-[80%] xl:w-full flex-col flex md:flex-row items-center justify-between '>
            <div className='xl:w-[50%] lg:w-[50%] md:w-[50%] md:gap-6 flex items-center lg:justify-between'>
              <div className='w-full'>
               <p className='text-4 font-semibold'>Hi Anderson</p>
               <h3 className=' text-[1.5rem] xl:text-[2rem] font-semibold'>Welcome back</h3>
              </div>
            </div>
            <div className='lg:w-[60%] xl:w-[50%] h-full flex items-center'>
            <div className='w-full h-[55%] lg:h-[50%] flex items-center gap-2 md:justify-between'>
             <form className='xl:h-full lg:w-[70%] w-[60%] lg:h-[75%]  border rounded-md flex overflow-hidden'>
              <button type='submit' className='flex items-center justify-center w-[10%]  bg-white'><ImSearch className='h-[.8rem] w-[.8rem] lg:h-[1rem] lg:w-[1rem]' /> </button>
              <input type="search" className='w-[90%] h-full outline-none p-2' placeholder='Search'  />
             </form>

             <div className='xl:h-[3rem] xl:w-[3rem]   w-[2rem] h-[2rem] rounded-[50%] lg:h-[70%] cursor-pointer flex justify-center items-center bg-primary relative'>
              <span className='h-[.7rem] w-[.7rem]  md:w-[1rem] md:h-[1rem] rounded-[50%] flex justify-center items-center p-2 absolute top-2 right-0 bg-red-600 text-white -translate-y-1/2'>2</span>
              <BsBellFill className='lg:h-[1.5rem] lg:w-[1.5rem] md:h-[1rem] md:w-[1rem] fill-white' />
             </div>

             <div className='xl:h-[3rem] xl:w-[3rem] w-[2rem] h-[2rem]  rounded-[50%] lg:h-[70%] cursor-pointer overflow-hidden'>
             <img src={user.image.includes(BASE_URL)?user.image:`${BASE_URL}/${user.image}`} alt="" className="h-full w-full" />
             </div>
            </div>
          </div>

         </div>
        </div>
  )
}

export default DashboardHeader