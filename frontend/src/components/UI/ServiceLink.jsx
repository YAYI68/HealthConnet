import React from 'react'
import { Link } from 'react-router-dom'

function ServiceLink({name,link}) {
  return (
    <Link to={link} className='w-fit rounded  p-2 bg-secondary hover:bg-primary text-primary hover:text-white'>
       {name}
    </Link>
  )
}

export default ServiceLink