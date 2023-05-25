import React from 'react'
import Medication from '../../assets/images/medications.jpg'
import { useLocation, useParams } from 'react-router-dom'
import useDataFetcher from '../../hooks/useDataFetcher'

const KEY='singleBlog'
const URL = 'blog'

function BlogDetailComponent() {
  const {state:{postId}} = useLocation()
  const { data,isLoading,error} = useDataFetcher(`${KEY}/${postId}`,`${URL}/${postId}/`)
  if(isLoading){
    return <h2>Loading.....</h2>
  }
  return (
    <div className='w-full  p-4 flex flex-col items-center'>
       <div className='w-full lg:w-[60%] h-full p-2 lg:p-4'>
         <div className='w-full h-full'>
           <div className=''>
             <div className='my-4'>
               <p className='text-primary bg-secondary w-fit p-1 rounded text-xs md:text-base '>{data.date}</p>
               <h1 className='text-[1.8rem] md:text-[2.5rem] font-semibold'>{data.title}</h1>
             </div>
              <div className='h-[20rem] lg:h-[30rem] w-full'>
                <img src={data.image} alt={data.title} className='h-full w-full object-cover' />
              </div>
              <div className='w-full mt-4'>
                <p className='text-[1.2rem]'>{data.content}</p>
              </div>
           </div>
         </div>
       </div>
    </div>
  )
}

export default BlogDetailComponent