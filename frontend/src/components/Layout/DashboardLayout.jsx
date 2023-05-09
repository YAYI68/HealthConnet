import React, { Fragment, useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardHeader from '../Header/DashboardHeader'
import SideNavbar from '../Header/SideNavbar'

function DashboardLayout() {
  const [slideIn, setSlideIn] = useState(false)
  return (
       <Fragment>
          <header className='h-[15vh]'>
            <nav className='w-full xl:w-[85%] xl:h-[15vh] lg:h-[10vh]  top-0 right-0 z-[5] bg-secondary p-2 lg:px-6 lg:py-4 border-b fixed xl:right-0 xl:top-0'>
             <DashboardHeader setSlide={setSlideIn} />
            </nav>
          </header>
          <main className='w-full flex justify-between'>
           <aside className=''>
             <nav className='w-full z-[6] fixed top-0 left-0 flex'>
              <SideNavbar slide={slideIn} setSlide={setSlideIn} />
             </nav>
           </aside>
           <section className='w-full xl:w-[85%]  p-[1rem] '>
             <Outlet />
           </section>
          </main>
       </Fragment>
          
  )
}

export default DashboardLayout