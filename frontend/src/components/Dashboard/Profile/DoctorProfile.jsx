import React from 'react'
import { FaPen } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import UserImg from '../../../assets/images/default.png';

import useSecureDataFetcher from '../../../hooks/useSecureDataFetcher';

const API_URL = 'doctor'
const DATA_KEY = 'doctorProfile';

function DoctorProfile() {
    const { data:doctor, error, isLoading } =  useSecureDataFetcher(DATA_KEY,API_URL)
    if(isLoading){
        return <h1>Loading.....</h1>
    }
  return (
    <div className='w-full lg:w-[90%] flex flex-col gap-4'>
         <div className='w-full flex flex-col items-center lg:items-baseline justify-center lg:w-full lg:py-8 '>
            <Link to='/dashboard/profile/edit' className=' flex items-center gap-2 bg-primary rounded-md p-2 self-end text-white'>
            <span><FaPen className='h-3 w-3' /></span>  <span>Edit</span>  
            </Link>
            <div className='w-[80%] flex items-center flex-col lg:flex-row gap-2 lg:gap-4 lg:w-[50%]'>
               <div className='h-[7rem] w-[7rem] lg:h-[12rem] lg:w-[12rem] rounded-[50%] overflow-hidden'>
                 <img src={doctor?.image?doctor.image: UserImg} alt=""  className='h-full w-full' />
                </div> 
                <div className='w-full lg:w-fit p-2'>
                    <p className='font-semibold text-[1.2rem] lg:text-[1.8rem] text-center '>Dr, {doctor.firstname} {doctor.lastname}</p>
                    <div className='flex flex-col items-center lg:flex-row gap-2 lg:justify-center'>
                      <p id='field' className='text-xs lg:text-[1rem] text-center text-primary'>{doctor.field}</p>    
                      <p className=' p-2 text-center  flex items-center gap-2 text-xs bg-secondary rounded-md text-primary'>{doctor.experience} experience</p>
                    </div>      
                </div>
            </div>
        </div>
        <div className='w-full px-4'>
            <p className='font-semibold text-[1rem] lg:text-[1.2rem]'>Personal Information</p>
            <div className='w-full rounded-md  border-2 p-2 flex flex-wrap flex-col lg:flex-row gap-2 lg:justify-between '>
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>First Name</p>
                      <p>{doctor?.firstname}</p>
                  </div>  
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Last Name</p>
                      <p>{doctor?.lastname}</p>
                  </div>
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Email</p>
                      <p>{doctor?.email}</p>
                  </div> 
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Gender</p>
                      <p>{doctor?.gender}</p>
                  </div>  
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Phone</p>
                      <p>{doctor?.phonenumber}</p>
                  </div>
                  <div className=' w-full'>
                      <p className='text-xs text-primary'>Bio</p>
                      <p className='text-[.85rem]'>this is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                  </div>
            </div>
        </div>
        <div className='w-full px-4'>
            <p className='font-semibold text-[1rem] lg:text-[1.2rem]'>Medical Information</p>
            <div className='w-full rounded-md  border-2 p-2 flex flex-wrap flex-col lg:flex-row gap-2 lg:justify-between '>
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Qualification</p>
                      <p>Bsc, Msc, Cardiology </p>
                  </div>  
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Specialization</p>
                      <p>{doctor.field}</p>
                  </div>
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Experience</p>
                      <p>{doctor.experience}</p>
                  </div>  
            </div>
        </div>
        <div className='w-full px-4'>
            <p className='font-semibold text-[1rem] lg:text-[1.2rem]'>Medical Center / Hospital</p>
            <div className='w-full rounded-md  border-2 p-2 flex flex-wrap flex-col lg:flex-row gap-2 lg:justify-between '>
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Country</p>
                      <p>Nigeria </p>
                  </div>  
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>State</p>
                      <p>{doctor.state}</p>
                  </div>
                  <div className=' w-full'>
                      <p className='text-xs text-primary'>Location</p>
                      <p>this is a long established fact that a reader will be distracted by the readable</p>
                  </div>  
            </div>
        </div>
    </div>
  )
}

export default DoctorProfile