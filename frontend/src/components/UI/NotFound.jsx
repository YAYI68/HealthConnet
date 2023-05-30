import React from 'react'
import NoItem from "../../assets/svg/no_item.svg"

function NotFound() {
  return (
    <div className='w-full min-h-[70vh] p-4 flex flex-col items-center'>
        <div className='w-full h-[25vh] lg:h-[30vh]  lg:w-[70%]'>
            <img src={NoItem} alt='Result not Found' className='h-full w-full' />
        </div>
        <div>
            <h2 className='text-[2rem] lg:text-[3rem] text-primary  font-[900]'>Result not Found</h2>
            <p className='text-[1rem] lg:text-[1.5rem] font-semibold'>We could not find what you searched For.</p>
            <p className='text-[1rem] lg:text-[1.5rem] font-semibold lg:text-center'>Try Again.</p>
        </div>
    </div>
  )
}

export default NotFound