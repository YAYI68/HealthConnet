import React from 'react'
import { HiArrowLeft } from 'react-icons/hi'
import { useAuthContext } from '../../context/AuthContext'

const summaryPosition=1

const AppointSummary = ({step,setStep,doctor}) => {
    const {user} = useAuthContext()
    const position = summaryPosition -  step
    
  return (
    <div style={{
        transform:`translateX(${position * 100}%)`,
        transition:'transform'
      }} className={`w-full h-full rounded-md px-2 py-4 absolute bg-secondary  transition-[transform]`}>
        <button onClick={()=>setStep((prev)=>prev - 1)} type="button" className='h-[2rem] w-[2rem] flex items-center justify-center rounded-[50%] bg-secondary'>
           <HiArrowLeft className='h-[80%] w-[80%] text-primary' />
        </button>
         <h3 className='text-primary lg:text-[1.5rem] font-semibold text-center'>Appointment Summary</h3>
         <div className='w-full flex text-[.7rem] md:text-[1rem]  items-center justify-center'>
            <div className='w-[90%]'>
              <div className=' w-full flex items-center justify-between p-2 border-b-2 border-b-black'>
                <p>Medical Center</p>
                <p className='text-primary'>{doctor.hospital}</p>
              </div>
              <div className=' w-full flex items-center justify-between p-2 border-b-2 border-b-black'>
                <p>Medical Location</p>
                <p className='text-primary'>{doctor.location}</p>
              </div>
              <div className=' w-full flex items-center justify-between p-2 border-b-2 border-b-black'>
                <p>Specialist</p>
                <p className='text-primary'>Dr, {doctor.firstname} {doctor.lastname}</p>
              </div>

              <div className=' w-full flex items-center justify-between p-2 border-b-2 border-b-black'>
                <p>Date and Time</p>
                <p className='text-primary'>January 29, 2020 at 11:00 AM</p>
              </div>

              <div className=' w-full flex items-center justify-between p-2 border-b-2 border-b-black'>
                <p>Patient</p>
                <p className='text-primary'>{user.firstname} {user.lastname}</p>
              </div>
              
              <div className=' w-full flex items-center justify-between p-2 border-b-2 border-b-black'>
                <p>Appointment Fee</p>
                <p className='text-primary'>$20</p>
              </div>
              
              <div className='mt-4'>
                <p className='text-primary font-semibold lg:text-[1.2rem]'>Payment Method</p>
                <div className='w-[60%] lg:w-[40%]'>
                    <div className='flex w-full items-center gap-2'>
                    <input type="radio" id='paypal' name="payment" value="" />
                    <label for="paypal">Paypal</label>    
                    </div>
                    <div className='flex w-full items-center gap-2'>
                    <input type="radio" name="payment" id='fluterware' value="" /> 
                    <label for="fluterware">Fluterware</label>
                    </div>
                </div>
              </div>
              
            </div>
            
         </div>
         <button onClick={()=>setStep((prev)=>prev + 1)} type="" className='absolute bottom-0 left-0 w-full p-2 text-center rounded-md bg-primary text-white '>Pay For Appointment</button>
         </div>
  )
}

export default AppointSummary