import React from 'react'

function BookingStatus({title,number,icon,bgColor}) {
  return (
    <div className='w-[70%] lg:w-[23%] px-6 py-4 flex items-center rounded-md shadow-md bg-gray-50 gap-6'>
      <div className={`h-[4rem] w-[4rem] rounded-[50%] flex items-center justify-center ${bgColor} `}>
        {icon}
      </div>
       <div className='flex flex-col gap-2'>
          <h3 className='text-[1.5rem] lg:text-[2rem] font-semibold'>{number}</h3>
          <p className='text-gray-600'>{title}</p>
       </div>
    </div>
  )
}

export default BookingStatus