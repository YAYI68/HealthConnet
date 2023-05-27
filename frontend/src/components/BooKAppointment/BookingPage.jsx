import React, { Fragment, useState } from 'react'
import { MdLocationPin, MdStarRate } from 'react-icons/md';
import { useLocation, useParams } from 'react-router-dom';
import DoctorImg from "../../assets/images/hero2.png";
import { BiInjection } from "react-icons/bi";
import BookingReview from './BookingReview';
import AppoimentSection from './AppoimentSection';
import { FaHospitalAlt, FaTimes } from 'react-icons/fa';

import useSecureDataFetcher from '../../hooks/useSecureDataFetcher';
import { useAppContext } from '../../context/AppContext';
import { useAuthContext } from '../../context/AuthContext';

const API_URL = 'user'
const DATA_KEY = 'Doctor';

export default function BookingPage() {
    const {setModalMessage,setUpdateModal } = useAppContext()
    const { user } = useAuthContext()
    const {state} = useLocation()
    const {data:doctor, isLoading  } =  useSecureDataFetcher(DATA_KEY,`${API_URL}/${state.id}`)
    const [ step, setStep ] = useState(0)
    const [ toggle, setToggle ] = useState(false)

    const closeToggle = ()=>{
      setToggle(false)
      setStep(0)
    }

    function handleNavigate() {
      if(user.isProfileComlete){
        ()=>setToggle(true)
      }
      else{
        setModalMessage('Please Update your profile and medical information before you proceed to Book Appointment')
        setUpdateModal(!user.isProfileComlete)
      }
     
    }

    if(isLoading){
      return <h1>Loading......</h1>
    }
    
  return (
    <div className='w-full min-h-screen  relative flex flex-col items-center mx-auto'>
      <div className={`w-full backdrop-blur-md bg-white/30 h-full absolute top-0 left-0 z-[5] ${toggle?'block':'hidden'}`} onClick={()=>closeToggle()}></div>
      <div className={`w-[90%] lg:w-[40%] rounded-md absolute top-[2%] md:top-[5%] left-1/2 -translate-x-1/2 z-[6] flex flex-col items-center ${toggle?'block':'hidden'} `}>
         <AppoimentSection doctor={doctor} step={step} setStep={setStep} closeToggle={closeToggle} />
      </div>
      <section className=' w-[95%] md:w-[80%] mx-auto p-2 md:p-6 mt-6'>
      <div className='flex w-full flex-col bg-secondary rounded-md lg:flex-row lg:items-center p-4'>
         <div className='w-full flex lg:justify-between flex-col md:flex-row p-4 gap-4 lg:items-center lg:w-[80%]'>
          <div className='h-[12rem] md:h-[15rem] lg:h-[18rem] w-full lg:w-[30%] bg-secondary rounded-md'>
           <img src={doctor.image} alt="doctor image" className=" w-full h-full " />
          </div>
          <div className='w-full text-[1.5rem] md:w-[50%] md:flex md:flex-col md:gap-2'>
           <p className='text-[1.2rem] md:text-[1.5rem] font-semibold w-full'>Dr, {doctor.firstname} {doctor.lastname}</p>
           <p className='text-[.8rem] sm:text-[1rem] lg:text-[1.2rem]'>{doctor.field}</p>
              <div className="flex">
                <p className='text-primary font-semibold text-[1rem] md:text-[1.2rem]'># 5000</p>
              </div>
              <div className='flex w-full gap-2 lg:gap-4'>
               <div className=' flex items-center bg-secondary p-1 rounded-md'>
                <div className='w-[1.2rem] h-[1.2rem] flex items-center bg-secondary'>
                  <BiInjection className='w-[90%] h-[90%] fill-primary' />
                </div>
                 <p className='flex flex-col justify-center items-center text-xs sm:text-[1rem] '> <span className='text-primary'>{doctor.experience}</span>  <span className='text-primary'>experience</span> </p>
               </div>
              </div>
           
           <div className="flex flex-col  justify-between items-center lg:items-start relative gap-2 md:gap-4">
            <p className="text-[.7rem] flex items-center text-primary font-[500] w-full lg:w-4/6 lg:text-[1rem]">
            <span className='mr-2'>
              <FaHospitalAlt />
            </span>{" "}
            {doctor.hospital}
          </p>
          <button
            className="w-full lg:w-2/6 text-xs font-semibold lg:text-[1rem] bg-primary text-white px-2 py-3 rounded-md "
            onClick={()=>handleNavigate()}
          >
            Book Now
          </button>
        </div>
        </div>
         </div>
         <div className='w-full md:w-[50%] lg:w-[30%]  p-2 rounded-md h-fit flex flex-col gap-2'>
          <div className=''>
          <p className="text-[.7rem] flex items-center md:items-baseline text-primary font-[500] w-full lg:w-4/6 lg:text-[1rem]">
            <span className='mr-2'>
            <MdLocationPin />
            </span>{" "}
           <span>{doctor.location}</span> 
          </p>
          </div>
          <div className='w-[80%] bg-secondary'>
            <p className='text-primary'>Availability:</p>
             <p className='text-[.8rem] md:text-[1rem]' >Mon - Fri</p>
            <p className='text-[.8rem] md:text-[1rem]'>9:00AM - 5:00PM</p>
          </div>
       
         </div> 
      </div>

      <div className='p-4'>
        <div className='w-full'>
          <h3
              className="uppercase relative font-bold font-jost text-[1.2rem] 
         before:block before:absolute before:w-[50%] before:h-[3px]
        before:bg-primary before:bottom-0 mb-4 w-fit"
            >About</h3>
            <p className=''>{doctor.bio}</p>
        </div>
        <div className='w-full mt-4'>
      <h3
              className="uppercase relative font-bold font-jost text-[1.2rem] 
         before:block before:absolute before:w-[50%] before:h-[3px]
        before:bg-primary before:bottom-0 mb-4 w-fit"
            >Qualification</h3>
            <p>{doctor.qualification}</p>
      </div>
      </div>
      <div className='w-full mt-4'>
      <div className='w-full p-4 flex flex-col'>
      <h3
              className="uppercase relative font-bold font-jost text-[1.2rem] 
         before:block before:absolute before:w-[50%] before:h-[3px]
        before:bg-primary before:bottom-0 mb-4 w-fit"
            >Reviews (29) </h3>
          <div className='w-full flex flex-col gap-4 lg:flex-row lg:justify-between lg:flex-wrap '>
          <BookingReview />
          <BookingReview />
          <BookingReview />
          <BookingReview />
          </div>
          <button type="button" className='text-primary hover:underline self-end mt-4'>see all</button>
      </div>
      </div>
    </section>
    </div>

  )
}
