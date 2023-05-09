import React from 'react';
import DashboardImg from '../../assets/images/dashboard.jpg'

function OverviewBanner() {
  return (
    <div className='w-full bg-primary rounded-md flex items-center justify-center'>
    <div className='w-[90%] flex flex-col lg:flex-row gap-4 items-center py-4'>
        <div className='w-[90%] lg:w-[48%] flex flex-col gap-2'>
           <h2 className='text-[1.5rem] text-white font-jost font-semibold lg:text-[3rem]'>Need to find a Doctor?</h2>
           <h2 className='text-[1.5rem] lg:text-[3rem] text-white font-jost font-semibold'>Go online with us!</h2>
           <p className='text-white text-[.8rem] lg:text-4'>Get your first medical service at home.</p>
           <button type="button" className='px-4 py-2 mt-4 rounded-md text-primary bg-white self-center lg:self-start hover:bg-gray-200 w-fit font-semibold shadow-md'>Book Appointment</button>
        </div>
        <div className='w-[90%] h-[15rem] lg:w-[40%]  lg:h-[20rem] rounded-[50%] overflow-hidden'>
            <img src={DashboardImg} alt='doctor picture' className='w-full h-full' />
        </div>
    </div>  
</div>
  )
}

export default OverviewBanner