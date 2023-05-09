import React, { Fragment } from 'react'
import AboutUsImg from '../../assets/images/AboutUs.png'

const AboutUs = () => {
  return (
    <Fragment>
      <section id="aboutUs" className="w-[95%] md:w-[80%] mx-auto p-2 md:p-6 mt-6">
        <div className="w-full p-2 relative md:p-6 flex flex-col lg:flex-row items-center gap-10">

          <div className=" flex flex-1 relative min-w-[12rem] min-h-[12rem] md:min-w-[20rem] md:min-h-[20rem] items-center justify-center">
            <img src={AboutUsImg} alt="about us" className='rounded-full max-w-[100%] max-h-[100%]'/>

            <div className='min-w-[7rem] min-h-[7rem] sm:min-w-[8rem] sm:min-h-[8rem] md:min-h-[12rem] md:min-w-[12rem] lg:min-h-[15rem] lg:min-w-[15rem] absolute bg-secondary left-[50%] 
            translate-x-[-50%] top-[10%]  -z-50 rounded-full'></div>
          </div>
          <div className="flex flex-col lg:w-[50%] w-full gap-6 pr-2">
            <h3
              className="uppercase relative font-bold font-jost text-[1.3rem] 
      before:block before:absolute before:w-[50%] before:h-[3px]
       before:bg-primary before:bottom-0 mb-4 w-fit"
            >
              About us
            </h3>
            <p className="text-[1rem] md:text-[1rem] w-full justify-text  text-gray-600 font-inter break-keep md:break-normal">
              Our mission is to provide patients with the ability to schedule
              appointments with the best healthcare professionals, anytime,
              anywhere. With Health Connect, patients have access to a
              comprehensive list of doctors and medical practitioners who
              specialize in various fields, ensuring that they receive the best
              possible care for their specific medical needs.
            </p>
            <button
              type="button"
              className="w-fit py-3 text-center md:self-start md:text-[1.2rem] bg-primary px-4 text-white rounded-md"
            >
              Learn more
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default AboutUs
