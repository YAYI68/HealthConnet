import React from 'react'
import { Avatar } from '../UI'

export default function TestimonialCard({details}) {
    const {name, sickness, message} = details
  return (
    <div className='flex relative w-[95%] justify-center px-2 md:px-8 py-8 rounded-2xl'>
        <div className='relative h-[5rem] w-[5rem]'><Avatar /></div>
        <div className='flex flex-col items-start ml-4'>
            <p className='font-bold mt-2'>{name}</p>
            <p className='mt-2 text-[1rem]'>{sickness}</p>
            <p className='flex text-left text-[.8rem] mt-2 pr-8 text-gray-600'>{message}</p>
        </div>
    </div>
  )
}
