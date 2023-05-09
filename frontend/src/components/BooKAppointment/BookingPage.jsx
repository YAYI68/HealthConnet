import React, { Fragment, useState } from 'react'
import { MdLocationPin, MdStarRate } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import DoctorImg from "../../assets/images/hero2.png";
import { BiInjection } from "react-icons/bi";
import BookingReview from './BookingReview';
import AppoimentSection from './AppoimentSection';
import { FaTimes } from 'react-icons/fa';

export default function BookingPage() {
    // const params = useParams()
    const [ step, setStep ] = useState(0)
    const [ toggle, setToggle ] = useState(false)

    const closeToggle = ()=>{
      setToggle(false)
      setStep(0)
    }
    
  return (
    <div className='w-full min-h-screen  relative flex flex-col items-center mx-auto'>
      <div className={`w-full backdrop-blur-md bg-white/30 h-full absolute top-0 left-0 z-[5] ${toggle?'block':'hidden'}`} onClick={()=>closeToggle()}></div>
      <div className={`w-[90%] lg:w-[40%] rounded-md absolute top-[5%] left-1/2 -translate-x-1/2 z-[6] flex flex-col items-center ${toggle?'block':'hidden'} `}>
         <AppoimentSection step={step} setStep={setStep} closeToggle={closeToggle} />
      </div>
      <section className=' w-[95%] md:w-[80%] mx-auto p-2 md:p-6 mt-6'>
      <div className='flex w-full flex-col lg:flex-row lg:items-center p-4'>
         <div className='w-full flex lg:justify-between p-4 gap-4 lg:items-center lg:w-[80%]'>
          <div className='h-[12rem] md:h-[15rem] lg:h-[18rem] w-[40%] lg:w-[28%] bg-secondary rounded-md'>
           <img src={DoctorImg} alt="doctor image" className=" w-full h-full " />
          </div>
          <div className='w-[50%] md:flex md:flex-col md:gap-2'>
           <p className='text-[1rem] md:text-[1.5rem] font-semibold'>Dr, Sunday Anderson</p>
           <p className='text-[.8rem] sm:text-[1rem] lg:text-[1.2rem]'>Cardiologist</p>
          
              <div className="flex">
                {Array.from({ length: 5 }, () => {
                return <MdStarRate className="text-primary" />;
                })}
              </div>
              <div className='flex w-full gap-2 lg:gap-4'>
               <div className=' flex items-center bg-secondary p-1 rounded-md'>
                <div className='w-[1.2rem] h-[1.2rem] flex items-center bg-secondary'>
                  <BiInjection className='w-[90%] h-[90%] fill-primary' />
                </div>
                 <p className='flex flex-col justify-center items-center text-xs sm:text-[1rem] '> <span className='text-primary'>7</span>  <span className='text-primary'>Experience</span> </p>
               </div>
              </div>
           
           <div className="flex flex-col  justify-between items-center lg:items-start relative gap-2">
            <p className="text-[.8rem] flex items-center text-primary font-[500] w-full lg:w-4/6 lg:text-[1rem]">
            <span>
              <MdLocationPin />
            </span>{" "}
            unn teaching hospital
          </p>

          <button
            className="w-full lg:w-2/6 text-xs lg:text-[1rem] bg-primary text-white px-1 py-2 rounded-md "
            onClick={()=>setToggle(true)}
          >
            Book Now
          </button>
        </div>
          </div>
         </div>
         <div className='w-full md:w-[50%] lg:w-[20%] bg-secondary p-2 rounded-md h-fit'>
          <p className='text-primary'>Availability:</p>
           <p className='text-[.8rem] md:text-[1rem]' >Mon - Fri</p>
           <p className='text-[.8rem] md:text-[1rem]'>9:00AM - 5:00PM</p>
         </div> 
      </div>

      <div className='p-4'>
        <div className='w-full'>
          <h3
              className="uppercase relative font-bold font-jost text-[1.2rem] 
         before:block before:absolute before:w-[50%] before:h-[3px]
        before:bg-primary before:bottom-0 mb-4 w-fit"
            >About</h3>
            <p className=''>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        </div>
        <div className='w-full mt-4'>
      <h3
              className="uppercase relative font-bold font-jost text-[1.2rem] 
         before:block before:absolute before:w-[50%] before:h-[3px]
        before:bg-primary before:bottom-0 mb-4 w-fit"
            >Qualification</h3>
            <p>M.B.B.S Cardo specialist</p>
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
