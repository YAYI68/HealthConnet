import React, { useState } from 'react'
import { AppointmentHeader, SpecialistCard } from '../components/BooKAppointment'
import useSecureDataFetcher from '../hooks/useSecureDataFetcher'


const API_URL = 'doctors/all'
const DATA_KEY = 'allDoctors';


export default function BookAppointment() {
  const [location,setLocation] = useState('')
  const [searchquery,setSearchQuery] = useState('')
  const {data:doctors, isLoading } = useSecureDataFetcher(`${DATA_KEY}\?state=${location}&q=${searchquery}`,`${API_URL}\state=${location}&q=${searchquery}`)
  console.log({all:doctors})
  console.log({searchquery})
  console.log({location})
  if(isLoading){
    return <h1>Loading.....</h1>
  }
  return (
    <div className='w-[95%] md:w-[80%] mx-auto p-2 md:p-6 mt-6 '>
      <AppointmentHeader 
        getLocation={setLocation}
        getQuery={setSearchQuery}
      />
      <section className='flex flex-wrap justify-center gap-4 mt-8 mb-4 md:flex-wrap'>
        {doctors.length? doctors.map((doctor,index)=>(
            < SpecialistCard key={index} doctor={doctor} />
        )) :
         <h1>No result found</h1>
        }
      
      </section>
    </div>
  )
}
