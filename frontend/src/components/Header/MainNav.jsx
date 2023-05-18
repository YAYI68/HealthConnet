import { Link, useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/AppContext"

import { useAuthContext } from "../../context/AuthContext"
import { useState } from "react";
import { BsBellFill } from "react-icons/bs";
import UserImg from '../../assets/images/default.png'
import { FiArrowDown } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import useLogout from "../../hooks/useLogout";
import { BASE_URL } from "../../utils/constant";

function MainNav() {
  const [dropdown,setDropDown] = useState(false);
 const navigate = useNavigate()
  const { inView } = useAppContext()
  const { accessToken,user } = useAuthContext()
  const logout = useLogout()

  const authUser = !!accessToken

  return (
   <nav  className={` hidden lg:flex w-full  lg:flex-col md:items-center lg:justify-center fixed z-[10] shadow-md bg-secondary h-[10vh] top-0 left-0 `}>
       <div onClick={()=>setDropDown(false)} className={`w-full h-screen absolute  top-[100%] ${dropdown?'block':'hidden'}`}></div>
      <div className="w-[80%] h-full flex items-center justify-between ">
        <Link className="text-[2rem] font-jost font-bold text-primary">HealthConnect</Link>
        <div className="flex items-center justify-between w-[60%] 2xl:w-[45%]">
          <ul className="flex list-none items-center gap-6 font-semibold" onClick={()=>setDropDown(false)}>
            <li>
              <Link to={'/'} className="font-semibold hover:text-primary">Home</Link>
            </li>
            <li>
              <Link to={'/'} className="hover:text-primary">About</Link>
            </li>
            <li>
              <Link to={'/blog'} className="hover:text-primary">Blog</Link>
            </li>
            <li>
              <Link  to={'/'} className="hover:text-primary">Contact</Link>
            </li>
          </ul>
          <ul className="flex items-center gap-4 list-none ">
            {!authUser ?
            <>
            <li>
             <Link to={'/login'}  className='text-primary'>Login</Link>
            </li>
           <li>
             <Link to={'/sign-up'} className="p-2 bg-primary text-white rounded">Signup</Link>
           </li>
            </>
             :
             <div className="flex items-center gap-2">
             <button className="h-[2rem] cursor-pointer w-[2rem] rounded-[50%] bg-primary relative flex flex-col items-center justify-center">
               {user.total_pending_appointment &&
               <span className="w-[.8rem] h-[.8rem] rounded-[50%] bg-red-500 absolute top-0 right-0 text-white text-xs flex flex-col justify-center items-center ">{user.total_pending_appointment}</span>               
               }
               <BsBellFill className='lg:h-[1.5rem] lg:w-[1.5rem]  fill-white' />
             </button>
             <div onClick={()=>setDropDown(!dropdown)} className="w-3rem cursor-pointer flex items-center border rounded-md border-primary relative">
              <div className="w-[2rem] h-[2rem] overflow-hidden  rounded-[50%]">
                <img src={user.image?user.image: UserImg} alt="" className="h-full w-full" />
              </div>
              <span className="h-[1rem] w-[1rem] flex justify-center items-center"><IoIosArrowDropdownCircle className="h-[80%] w-[80%] text-primary" /></span> 
              {dropdown && 
               <div className="w-[10rem] h-fit  absolute top-[130%] right-1 rounded-md bg-secondary shadow-md border-primary border">
               <ul className="w-full p-2  font-semibold text-[.85rem] md:text-[1rem]">
                 <li className="w-full">
                   <Link to={'/dashboard/profile'}  className="w-full p-2 group hover:bg-primary hover:text-white flex items-center gap-2 rounded-md"> <span> <FaUserAlt className="fill-primary group-hover:fill-white " /> </span>  <span>Profile</span> </Link>
                 </li>
                 <li>
                 <Link   to={'/dashboard/overview'} className="w-full p-2 hover:bg-primary hover:text-white flex items-center gap-2 group rounded-md"> <span> <MdSpaceDashboard className="fill-primary group-hover:fill-white " /> </span>  <span>Dashboard</span> </Link>
                 </li>
                 <li>
                 <button onClick={()=>logout()}  className="w-full p-2 hover:bg-primary hover:text-white flex items-center gap-2 group  rounded-md"> <span> <IoExit className="fill-primary group-hover:fill-white " /> </span>  <span>Signout</span> </button>
                 </li>
               </ul>
             </div>
              }
             </div>
           </div>
          }
           
           </ul>
        </div>
      </div> 
   </nav>
  )
}

export default MainNav