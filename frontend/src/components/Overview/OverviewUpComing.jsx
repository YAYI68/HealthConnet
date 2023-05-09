import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import OverviewTable from './OverviewTable';
import OverviewCalender from './OverviewCalender';

function OverviewUpComing() {
  return (
    <div className='w-full flex flex-col lg:justify-between lg:flex-row'>
       <div className='w-[90%] lg:w-[65%] rounded-md shadow-lg bg-white '>
         <div className='w-full flex flex-col lg:flex-row lg:justify-between lg:items-center p-4'>
           <h3 className='text-[1.5rem] font-semibold'>Upcoming Appointment</h3> 
            <p className='flex items-center gap-2 p-2 rounded-md border-2 w-fit'> <span>latest Appointments</span>  <span><MdOutlineKeyboardArrowDown className='h-6 w-6' /></span> </p>
         </div>
         <div className='w-full overflow-x-scroll'>
           <OverviewTable />
         </div>
       </div>
       <div className='w-[90%] lg:w-[30%]'>
         <OverviewCalender />
       </div>
    </div>
  )
}

export default OverviewUpComing