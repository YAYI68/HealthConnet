import { useState } from "react";
import { FiClock } from "react-icons/fi";

function Time({period,getTime,current,disabled}) {

    const handClick = ()=>{
        getTime(period)
    }
  return (
    <button disabled={disabled} onClick={()=>handClick()} className={` ${disabled?'bg-gray-200 border-none text-gray-200':''}  ${period===current && !disabled?'bg-primary text-white':'bg-white text-primary'} xl:w-[20%] w-fit h-fit p-2 flex items-center gap-2 border-2 rounded-md border-primary shadow-md mt-2 text-xs lg:text-[1rem]`}>
      <span>{period}</span>
      <span><FiClock /></span>
    </button>
  )
}

export default Time