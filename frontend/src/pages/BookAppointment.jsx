import React from 'react'
import { AppointmentHeader, SpecialistCard } from '../components/BooKAppointment'
import useDataFetcher from '../hooks/useDataFetcher'


const API_URL = 'doctors/all'
const DATA_KEY = 'allDoctors';


export default function BookAppointment() {
  const {data, isLoading } = useDataFetcher(DATA_KEY,API_URL)
  console.log({all:data})
  return (
    <div className='w-[95%] md:w-[80%] mx-auto p-2 md:p-6 mt-6 '>
      <AppointmentHeader />
      <section className='flex flex-wrap justify-center gap-4 mt-8 mb-4'>
        
        {Array.from({length: 6}, (item, id)=>< SpecialistCard key={id} id={id}/>)}
      </section>
    </div>
  )
}
