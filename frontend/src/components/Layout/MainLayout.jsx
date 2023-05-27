import React, { Fragment } from 'react'
import Navbar from '../Header/Navbar'
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom'
import UpdateProfileModal from '../UI/UpdateProfileModal';
import { useAppContext } from '../../context/AppContext';


function MainLayout() {
  const { pathname } = useLocation();
  const{ upDateModal, setUpdateModal } = useAppContext()

  return (
    <Fragment>
      {pathname === '/login' ||
       pathname === '/sign-up'
       ? <main>
        {upDateModal?
        <UpdateProfileModal />
        :''
        }
        
        <Outlet />
          </main> 
        : 
        <Fragment>
        <Navbar/>
          <main className=''>
          {upDateModal?
           <UpdateProfileModal />
          :''
          }
         <Outlet />
          </main>
         <Footer />
        </Fragment>
      }    
    </Fragment>
  )
}

export default MainLayout