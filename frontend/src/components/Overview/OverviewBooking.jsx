import React from 'react'
import BookingStatus from '../UI/BookingStatus';
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { BookingData } from '../../data';

function OverviewBooking() {
  return (
    <div className='flex items-center w-full lg:justify-between gap-4 lg:gap-0 flex-col lg:flex-row flex-wrap'>
      {BookingData.map((booking,i)=>(
        <BookingStatus
        key={i}
        title={booking.title}
        number={booking.number}
        bgColor={booking.bgColor}
        icon={booking.icon}
       />
      ))}
      
    </div>
  )
}

export default OverviewBooking