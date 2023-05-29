import React, { useState } from 'react'
import { MdOutlineCheck,MdKeyboardArrowDown } from 'react-icons/md'
import { NigeriaState } from '../../data'



function DropDownSelect({defaultValue,onChange,svgIcon,options}) {
    const [value,setValue] = useState(defaultValue)
    const [ dropDown,setDropDown] = useState(false)

    const selectValue = (text)=>{
      setValue(text)
      onChange(text)
      setDropDown(false)
    }
   
     
  return (
    <div className='w-full relative' >
         <div onClick={()=>setDropDown(!dropDown)} className='w-full flex items-center cursor-pointer p-2  bg-white border border-primary rounded-md overflow-hidden'>
         <button className=' flex text-[1.2rem] items-center justify-center w-[10%]'>
          {svgIcon?svgIcon:''}
         </button>   
         <p className='w-[80%] px-2'>
            {value}
         </p>
         <button className='h-full flex text-[1.2rem] items-center justify-center  w-[10%]'>
            <MdKeyboardArrowDown />
         </button>
         </div>
         {dropDown?
         <DropDownOption 
         options={options} 
         setOption = {selectValue}
         currentValue = {value}
         />
         :''
         }
    </div>
  )
}

export default DropDownSelect

function DropDownOption ({options,setOption,currentValue}){
    return(
        <div className='w-full max-h-[15rem] overflow-scroll top-[110%]  absolute z-[10] bg-white border border-primary p-2 rounded-md '>
          <ul className='w-full'>
            {options.map((option,i)=>(
            <li onClick={()=>setOption(option)} key={i} className={`w-full my-1 cursor-pointer rounded-md flex items-center hover:text-black justify-between    hover:bg-secondary p-2 ${currentValue===option?'bg-primary text-white':''}`}> <span>{option}</span> {currentValue===option?<span><MdOutlineCheck /></span>:''} </li>
            ))}
          </ul>
        </div>
    )
}
