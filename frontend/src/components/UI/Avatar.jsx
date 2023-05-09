import React from 'react'
import ProfileImg from "../../assets/images/hero.png"

export default function Avatar() {
  return (
    <div className='max-w-[100%] max-h-[100%] rounded-full flex items-center justify-center'>
        <img src={ProfileImg} alt="" className='max-h-[100%] max-w-[100%] rounded-full'/>
    </div>
  )
}
