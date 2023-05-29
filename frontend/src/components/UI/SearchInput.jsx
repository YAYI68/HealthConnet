import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

function SearchInput({placeholder,onSubmit}) {
    const [searchData,setSearchData] = useState()

    const handleSubmit = (e)=>{
        e.preventDefault()
        onSubmit(searchData)
    }
  return (
    <form onSubmit={handleSubmit} className='w-full bg-white flex  items-center justify-center '>
      <input type="search" placeholder={placeholder} onChange={(e)=>setSearchData(e.target.value)} className='w-full placeholder:text-xs placeholder:text-gray-700 p-2 outline-none' />
      <button className='p-2 flex flex-col items-center justify-center'>
        <FaSearch 
         className='text-primary'
        />
      </button>
    </form>
  )
}

export default SearchInput