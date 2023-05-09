import React from 'react'
import { ServiceLink } from '../UI';
import { DoctorServices } from '../../data'
import { Link } from 'react-router-dom';


function OverviewServices() {
  return (
    <section className=' flex flex-col gap-4'>
       <h3
        className="relative self-center font-bold  w-fit font-jost text-[1.3rem] 
      before:block before:absolute before:w-[50%] before:h-[3px]
       before:bg-primary before:bottom-0 before:left-[50%] before:translate-x-[-50%] mb-4"
      >
        Explore Our Expertise
      </h3>
      <div className='flex flex-wrap gap-4 w-full'>
           {DoctorServices.map((service,i) =>(
              <ServiceLink key={i} name={service.name} link={service.link} />
           ))}
      </div>
      <Link to='' className='text-primary hover:underline self-end block '>view all</Link>
    </section>
  )
}

export default OverviewServices