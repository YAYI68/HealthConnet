import { useState } from 'react'
import { MdLocationPin } from 'react-icons/md'
import Time from '../UI/Time'
import { workHours } from '../../data'
import { toast } from 'react-toastify'
import { checkWokingDays } from '../../utils'
import { FaHospitalAlt } from 'react-icons/fa'

const schedulePosition = 0

function AppointmentSchedule({step,setStep,doctor}) {
    const [ date , setDate ] = useState('')
    const [ time, setTime ] = useState('')
     
    const position = schedulePosition - step

    const currentAppointmentTime = [
     '9:15 AM','10:30 AM','11:00 AM'
    ] 
    const handleChange = (value)=>{
     const isWorkingDays = checkWokingDays(value)
      if(!isWorkingDays){
       toast.warning('Sorry, Please select a weekday from Monday to Friday')
      }
      else{
       setDate(value)
      }
    }

    const getTime = (time)=>{
     setTime((time))
    }

    const nextPage = ()=>{
        if(time && !date){
            toast.warning('Sorry, Please select Your Appointment Date before you proceed.')
        }
        else if (date && !time){
            toast.warning('Sorry, Please select Your Appointment Time before you proceed.')
        }
        else if (!date && !time){
            toast.warning('Sorry, Please select Your Appointment Time and Date before you proceed.')
        }
        else{
            setStep((prev)=>prev + 1)
        }
       
    }

  return (
    <div style={{
        transform:`translateX(${position * 100}%)`,
        transition:'transform'
      }}  className={`w-full h-full rounded-md px-2 py-4 absolute`}>
             <h3 className='text-center font-semibold text-primary  lg:text-[1.5rem]'>Book Appointment</h3>
            <div className='text-center'>
                <p className='font-semibold lg:text-[1.5rem]'>Dr, {doctor.firstname} {doctor.lastname}</p>
                <small className='text-primary lg:text-[1rem]'>{doctor.field}</small>
            </div>

            <div className='w-full md:w-[50%] lg:w-[50%] bg-secondary p-2 rounded-md h-fit'>
             <p className='text-primary lg:text-[1.2rem]'>Availability:</p>
             <p className='text-[.8rem] md:text-[1rem]' >Mon - Fri</p>
             <p className='text-[.8rem] md:text-[1rem]'>9:00AM - 5:00PM</p>
            </div> 
            <p className="text-[.8rem] flex items-center text-primary font-[500] w-full lg:w-4/6 lg:text-[1rem]">
            <span className='mr-2'>
              <FaHospitalAlt />
            </span>{" "}
            {doctor.hospital}
          </p>
          <p className="text-[.8rem] flex items-center text-primary font-[500] w-full lg:w-4/6 lg:text-[1rem]">
            <span className='mr-2'>
              <MdLocationPin />
            </span>{" "}
            {doctor.location}
          </p>
            <div className='my-4'>
                <p className='font-semibold'>Schedule Date</p>
                <input type="date" name="" value={date} onChange={(e)=>handleChange(e.target.value)} className='p-2 text-primary rounded-md' />
            </div>
            <div className='my-4'>
                <p className='font-semibold'>Visiting hour</p>
                <div className='flex gap-2 flex-wrap h-[7rem] overflow-scroll'>
                  {workHours.map((period,i)=>{
                   const  disabled = currentAppointmentTime.includes(period)
                    return  <Time key={i} period={period} getTime={getTime} current={time} disabled={disabled} />
                  }
                  )}
                </div>
            </div>

         
         <button onClick={()=>nextPage()} type="" className='absolute bottom-0 left-0 w-full p-2 text-center rounded-md bg-primary text-white'>Continue</button>
         </div>
  )
}

export default AppointmentSchedule