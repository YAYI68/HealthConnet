import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { DashboardLink } from '../../data'
import { IoExit } from 'react-icons/io5';
import DefaultImg from "../../assets/images/default.png";
import { FaTimes } from 'react-icons/fa';
import useLogout from '../../hooks/useLogout';
import { useAuthContext } from '../../context/AuthContext';

function SideNavbar({slide,setSlide}) {
  const { user } = useAuthContext()
  const logout = useLogout()
  return (
    <div className={`xl:w-[15%] fixed left-0 top-0 z-[6] ${slide ? 'translate-x-0':'-translate-x-[100%]' }  xl:translate-x-[0] w-[60%] lg:w-[30%] h-screen bg-secondary border-r`}>
     <div className='h-[15vh] p-4 flex flex-col  '>
        <button type="button" onClick={()=>setSlide(false)} className='h-[3rem] w-[3rem] xl:hidden flex items-center justify-center self-end'>
          <FaTimes className='h-[70%] w-[70%] text-primary' />
        </button>
       <div className=' flex justify-center items-center '>
       <Link to={'/'} className="lg:text-[1.5rem] text-[1.5rem] xl:text-[2rem] font-jost font-bold text-primary">HealthConnect</Link>
       </div>
     </div>
    <div className='w-full bg-secondary h-[85vh] overflow-y-auto p-4'>
      <div className='w-full h-full flex flex-col justify-between'>
        <ul className='w-full flex flex-col gap-2'>
           {DashboardLink.map((nav,i)=>(
             <li key={i}  className='w-full'>
             <NavLink to={`${nav.link}`} className={ ({isActive})=>isActive?' w-full p-4  flex  items-center bg-primary text-white  shadow-lg gap-4 rounded-lg':
             ' w-full p-4  flex  items-center  gap-4 rounded-lg text-primary'}>
              {nav.icon}
               <span className='text-[.8rem] lg:text-[1rem] font-semibold'>{nav.name}</span>
             </NavLink>
           </li>
           ))}                
        </ul>
           <ul className='w-full flex flex-col gap-2'>
            <li  className='w-full'>
              <NavLink to={`/dashboard/profile`} className={' w-full p-4  flex  items-center  gap-4 rounded-lg'}>
              <div className='w-[2rem] h-[2rem]'>
                <img src={DefaultImg} alt='' />
              </div>
               <span className='text-[.8rem] text-primary lg:text-[1rem] font-semibold'>{user.firstname}</span>
             </NavLink>
             </li>  
             <li  className='w-full'>
             <NavLink onClick={()=>logout()}  className={'w-full p-4 text-primary flex  items-center  gap-4 rounded-lg'}>
             <IoExit className='h-[1rem]  w-[1rem] lg:h-[1.5rem] lg:w-[1.5rem]'/>
               <span className='text-[.8rem] lg:text-[1rem] font-semibold'>Sign out</span>
             </NavLink>
           </li>              
        </ul>
      </div>
    </div>
  </div>
  )
}

export default SideNavbar