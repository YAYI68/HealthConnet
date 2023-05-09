import React, { Fragment, useLayoutEffect, useState } from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'

function Calender() {
    const [calenderMonth, setCalenderMonth ] = useState()
    const [calenderYear, setCalenderYear ] = useState()
    const [calenderDays, setCalenderDays ] = useState()
    const [ currMonth, setCurrMonth ] = useState()
    const [ activeDay,setActiveDay ] = useState()
    const [ show,setShow] = useState(false)
    const [date,setDate] = useState(new Date())
   
    // Check for leap years
   const isLeapYear = (year)=>{
       return (year % 4 ===0 && year % 100 !== 0 && year % 400 !== 0) ||
       (year % 100 === 0 && year % 400 === 0)
    }
    
    // Get correct february days 
   const getFebDays = (year)=>{
        return isLeapYear(year) ? 29 : 28
    }

    const days_of_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const days_of_month = [31,getFebDays(calenderYear),31,30,31,30,31,31,30,31,30,31]

//    List all the  days with their correct days of the week
    const list_month_days = (month,year)=>{
        const date = new Date(year,month,1)
        const first_day = date.getDay()
         const totals =   days_of_month[month]  + first_day  
        const day_on_cal = Array.from({length:totals},(_,num)=>{
          return num+1 - first_day <= 0 ? '' : num + 1 - first_day 
         })
         return day_on_cal
       }

    //   select the next year 
       const next_year = (year,month)=>{
           const new_month = monthNames.indexOf(month)
          let new_year = year + 1
          setDate(new Date (new_year,new_month))
       }
    // select the previous year
       const prev_year = (year,month)=>{
        const new_month = monthNames.indexOf(month)
        let new_year = year - 1
        setDate(new Date (new_year,new_month))
     }
     
    //  Change month 
     const changeMonth = (year,month)=>{
        const new_month = monthNames.indexOf(month)
        setDate(new Date (year,new_month))
        setShow(false)
     }
      

    useLayoutEffect(()=>{   
        const curr_month = date.getMonth()
        setCurrMonth(curr_month)
        const curr_year = date.getFullYear()
        const curr_day = date.getDate()
        setActiveDay(curr_day)
        setCalenderMonth(monthNames[curr_month])
        setCalenderYear(curr_year)
        const available_days =  list_month_days(curr_month,curr_year)
        setCalenderDays(available_days)
    },[date])


  return (
   <div className='w-full h-fit shadow-md rounded-md relative border-2 overflow-hidden'>
     <div className='flex justify-between items-center font-[600] text-[1.5rem] p-4'>
        <span onClick={()=>setShow(!show)} className='px-4 py-2 rounded-md cursor-pointer hover:bg-secondary'>{calenderMonth}</span>
        <div className='flex items-center w-fit'>
           <button type="button" onClick={()=>prev_year(calenderYear,calenderMonth)} className='h-[2rem] w-[2rem] group rounded-[50%] grid place-content-center my-0 mx-4 cursor-pointer hover:bg-primary' id='prev-year'>
             <MdOutlineKeyboardArrowLeft className='group-hover:fill-white' />
            </button> 
            <span>{calenderYear}</span>
            <button type='button'  onClick={()=>next_year(calenderYear,calenderMonth)} className='h-[2rem] w-[2rem] group rounded-[50%] grid place-content-center my-0 mx-4 cursor-pointer hover:bg-primary' id='next-year'>
                <MdOutlineKeyboardArrowRight className='group-hover:fill-white' />
            </button>
        </div>
     </div>
     <div className='p-4 '>
        <div className='grid grid-cols-7 font-[600] h-[3rem]'>
            {days_of_week.map((day,i)=>(
               <div key={i} className='grid place-items-center'>{day}</div>
            ))}
        </div>
         <div className='grid grid-cols-7 font-[600] gap-1 '>
            {calenderDays?.map((num,i)=>(
                <div key={i} className= {` w-[2rem] h-[2rem] flex items-center justify-center p-2 relative cursor-pointer ${(activeDay === num) && num !== ''? 'rounded-[50%] text-white bg-primary shadow-lg':'group' }`}>    
                {num}
                {num !== '' && 
                 <Fragment>
                   <span className='group-hover:transition-[width,height] w-1 h-0 group-hover:h-full  bottom-0 left-0 bg-primary  group-hover:ease-in-out group-hover:duration-[.2s] absolute'></span>
                <span className='group-hover:transition-[width,height] delay-[.2s] absolute w-0 h-1 group-hover:w-full top-0 left-0 bg-primary group-hover:ease-in-out group-hover:duration-[.2s] '></span>
                <span className='absolute w-1 h-0 group-hover:h-full delay-[.4s] bg-primary top-0 right-0 group-hover:ease-in-out group-hover:duration-[.2s] group-hover:transition-[width,height]'></span>
                <span className='absolute w-0 h-1 group-hover:w-full delay-[.6s] bottom-0 right-0 bg-primary group-hover:ease-in-out group-hover:duration-[.2s] group-hover:transition-[width,height]'></span>
                 </Fragment>
                }
                
            </div>
            ))} 
        </div>
     </div>

     <div className={`absolute top-0 left-0 w-full h-full grid grid-cols-3 place-items-center gap-4 shadow-md transition-[transform,visibility] bg-secondary p-2 scale-105 ${show ?'scale-100 visible':'scale-50 invisible'}`}>
        {monthNames.map((month,i)=>(
            <div key={i} onClick={()=>changeMonth(calenderYear,month)} className='grid place-items-center text-primary w-full p-2 rounded cursor-pointer hover:bg-primary hover:text-white'>{month}</div>
        ))}
     </div>
   </div>
  )
}


export default Calender