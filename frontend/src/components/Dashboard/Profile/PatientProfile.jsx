import React from 'react';
import { FaPen } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import UserImg from '../../../assets/images/default.png';
import useSecureDataFetcher from '../../../hooks/useSecureDataFetcher';

const API_URL = 'patient'
const DATA_KEY = 'patientProfile';

function PatientProfile() {
    const { data:patient, error, isLoading } =  useSecureDataFetcher(DATA_KEY,API_URL)
    console.log({patient})
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
               <div className='h-[7rem] w-[7rem] lg:h-[12rem] lg:w-[12rem] rounded-[50%]  overflow-hidden'>
               <img src={patient?.image?patient.image: UserImg} alt=""  className='h-full w-full' />
                </div> 
                <div className='w-full lg:w-fit p-2'>
                    <p className='font-semibold text-[1.2rem] lg:text-[1.8rem] text-center '> {patient?.firstname} {patient?.lastname}</p>
                    {/* <div className='flex flex-col items-center lg:flex-row gap-2 lg:justify-center'>
                      <p className='text-xs lg:text-[1rem] text-center text-primary'>Cardiologist</p>    
                      <p className=' p-2 text-center  flex items-center gap-2 text-xs bg-secondary rounded-md text-primary'>7 experience</p>
                    </div>       */}
                </div>
            </div>
        </div>
        <div className='w-full px-4'>
            <p className='font-semibold text-[1rem] lg:text-[1.2rem]'>Personal Information</p>
            <div className='w-full rounded-md  border-2 p-2 flex flex-wrap flex-col lg:flex-row gap-2 lg:justify-between '>
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>First Name</p>
                      <p>{patient?.firstname}</p>
                  </div>  
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Last Name</p>
                      <p>{patient?.lastname}</p>
                  </div>
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Email</p>
                      <p>{patient?.email}</p>
                  </div>  
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Gender</p>
                      <p>{patient?.gender}</p>
                  </div>  
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Phone</p>
                      <p>{patient?.phonenumber}</p>
                  </div>
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Age</p>
                      <p>{patient.age}</p>
                  </div>
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Country</p>
                      <p>Nigeria</p>
                  </div>
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>State</p>
                      <p>{patient?.state}</p>
                  </div>

               
            </div>
        </div>
        <div className='w-full px-4'>
            <p className='font-semibold text-[1rem] lg:text-[1.2rem]'>Medical Information</p>
            <div className='w-full rounded-md  border-2 p-2 flex flex-wrap flex-col lg:flex-row gap-2 lg:justify-between '>
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Genotype</p>
                      <p>{patient?.genotype}</p>
                  </div>  
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Marital Status</p>
                      <p>{patient?.marital_status}</p>
                  </div>
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Blood Group</p>
                      <p>{patient?.blood_group}</p>
                  </div> 
                  <div className='lg:w-[45%] w-full'>
                      <p className='text-xs text-primary'>Weight(kg)</p>
                      <p>{patient?.weight}</p>
                  </div>
                  <div className=' w-full'>
                      <p className='text-xs text-primary'>Medical History</p>
                      <p className='text-[.85rem]'>{patient.medical_history}</p>
                  </div> 
            </div>
        </div>
    </div>
  )
}

export default PatientProfile