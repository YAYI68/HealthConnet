import React, { Fragment } from 'react'
import Navbar from '../Header/Navbar'
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom'


function MainLayout() {
  const { pathname } = useLocation();

  return (
    <Fragment>
      {pathname === '/login' ||
       pathname === '/sign-up'
       ? <main>
        <Outlet />
          </main> 
        : 
        <Fragment>
        <Navbar/>
          <main >
         <Outlet />
          </main>
         <Footer />
        </Fragment>
      }    
    </Fragment>
  )
}

export default MainLayout