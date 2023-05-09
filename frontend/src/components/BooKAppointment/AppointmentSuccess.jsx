import React, { useRef } from 'react'
import  OrderConfirm from '../../assets/svg/confirm.svg'
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

function AppointmentSuccess({step,setStep}) {
    const navigate = useNavigate()
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    const position = 2 -  step

    const goHome = ()=>{
        setStep(0)
        navigate('/')
    }
 
    return (
      <div  style={{
        transform:`translateX(${position * 100}%)`,
        transition:'transform'
      }} className={`w-full h-full rounded-md px-2 py-4 absolute bg-secondary  transition-[transform]`}>
         
            <div ref={componentRef} className='w-full flex flex-col items-center justify-center '>
                <div className=' flex flex-col gap-2 items-center mb-4'>
                    <div className='h-[10rem] w-[10rem]'>
                        <img src={OrderConfirm} alt="succcess" className='w-full h-full' />
                    </div>
                    <p className='text-gray-500'>Your Appointment has been confirm</p>
                </div>
              <div className='w-[90%]'>
                <div className=' w-full flex items-center justify-between p-2 border-b-2 border-b-black'>
                  <p className='text-xs lg:text-[1rem]'>Medical Center</p>
                  <p className='text-primary text-xs lg:text-[1rem]'>unn teaching hospital</p>
                </div>
  
                <div className=' w-full flex items-center justify-between p-2 border-b-2 border-b-black'>
                  <p className='text-xs lg:text-[1rem]'>Specialist</p>
                  <p className='text-primary text-xs lg:text-[1rem]'>Dr, Sunday Anderson</p>
                </div>
  
                <div className=' w-full flex items-center justify-between p-2 border-b-2 border-b-black'>
                  <p className='text-xs lg:text-[1rem]'>Date and Time</p>
                  <p className='text-primary text-xs lg:text-[1rem]'>January 29, 2020 at 11:00 AM</p>
                </div>
  
                <div className=' w-full flex items-center justify-between p-2 border-b-2 border-b-black'>
                  <p className='text-xs lg:text-[1rem]'>Patient</p>
                  <p className='text-primary text-xs lg:text-[1rem]'>Yayi Abiodun</p>
                </div>
                
                <div className=' w-full flex items-center justify-between p-2 border-b-2 border-b-black'>
                  <p className='text-xs lg:text-[1rem]'>Appointment Fee</p>
                  <p className='text-primary text-xs lg:text-[1rem]'>$20</p>
                </div>
              </div>
              
           </div>
          <div className='absolute flex flex-col items-center bottom-2 left-0 w-full'>
          <div className='flex w-[80%] lg:w-[50%] items-center justify-between'>
           <button onClick={()=>goHome()} type="" className='p-2 text-center rounded-md bg-primary text-white '>Go Home</button>
           <button onClick={()=>handlePrint()} type="" className='p-2 text-center rounded-md bg-primary text-white '>Print Appointment</button>   
          </div>
          </div>
           
           </div>
    )
}

export default AppointmentSuccess