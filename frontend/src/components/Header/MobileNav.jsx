import { FaTimes, FaUserAlt } from "react-icons/fa";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { FiArrowDown } from "react-icons/fi";
import UserImg from '../../assets/images/default.png'
import { BsBellFill } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import { useAuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/constant";

function MobileNav() {
  const [dropdown,setDropDown] = useState(false);
  const [toggle,setToggle] = useState(false)
  const { accessToken,user } = useAuthContext()
  const navigate = useNavigate()

  const authUser = !!accessToken
  
  const routeTo = (path)=>{
    setDropDown(false)
    setToggle(false)
    navigate(path)
  }

  return (
    <nav className="w-full  flex flex-col items-center justify-center  lg:hidden shadow-lg fixed z-[10] h-[10vh] bg-secondary">
      <div className="h-full p-4 w-full  flex justify-center items-center relative">
        <div onClick={()=>setDropDown(false)} className={`w-full h-screen absolute top-[100%] ${dropdown?'block':'hidden'}`}></div>
       <div className="w-full px-4 bg-secondary  h-full absolute z-[30]  flex justify-between items-center ">
        <Link to={'/'} className="text-primary font-jost font-semibold text-[1.3rem] md:text-[1.5rem] ">HealthConnect</Link>
        <div className="flex items-center gap-4">
           {authUser?
           <div className="flex items-center gap-2">
           <div className="h-[2rem] w-[2rem] rounded-[50%] bg-primary relative flex flex-col items-center justify-center">
             <span className="w-[.8rem] h-[.8rem] rounded-[50%] bg-red-500 absolute top-0 right-0 text-white text-xs flex flex-col justify-center items-center ">2</span>
             <BsBellFill className='lg:h-[1.5rem] lg:w-[1.5rem]  fill-white' />
           </div>
           <div onClick={()=>setDropDown(!dropdown)} className="w-3rem flex items-center border rounded-md border-primary relative">
            <div className="w-[2rem] h-[2rem]  rounded-[50%]">
            <img src={user.image?user.image: UserImg} alt="" className="h-full w-full" />
            </div>
            <span className="h-[1rem] w-[1rem] flex justify-center items-center"><FiArrowDown className="h-[80%] w-[80%] text-primary" /></span> 
            {dropdown && 
             <div className="w-[10rem] h-fit  absolute top-[130%] right-1 rounded-md bg-secondary shadow-md border-primary border">
             <ul className="w-full p-2  font-semibold text-[1rem] md:text-[1.2rem]">
               <li className="w-full">
                 <Link to={'/dashboard/overview'}  className="w-full p-2 hover:bg-primary hover:text-white flex items-center gap-2 rounded-md"> <span> <FaUserAlt className="fill-primary hover:fill-white hover:text-white" /> </span>  <span>Profile</span> </Link>
               </li>
               <li>
               <Link   to={'/dashboard/overview'} className="w-full p-2 hover:bg-primary hover:text-white flex items-center gap-2 rounded-md"> <span> <MdSpaceDashboard className="fill-primary hover:fill-white hover:text-white" /> </span>  <span>Dashboard</span> </Link>
               </li>
               <li>
               <Link  to={'/dashboard/overview'} className="w-full p-2 hover:bg-primary hover:text-white flex items-center gap-2  rounded-md"> <span> <IoExit className="fill-primary hover:fill-white hover:text-white" /> </span>  <span>Signout</span> </Link>
               </li>
             </ul>
           </div>
            }
           </div>
         </div>
         :""
          }
           
          {toggle ?   <button type="button" className="h-[3rem] w-[3rem] flex items-center justify-center" onClick={()=>setToggle(false)}>
           < FaTimes className="h-[80%] w-[50%] text-primary" />
         </button>:
          <button type="button" className="h-[3rem] w-[3rem] flex items-center justify-center" onClick={()=>setToggle(true)}>
          <HiOutlineBars3BottomRight className="h-[80%] w-[80%] text-primary" />
         </button>   
          }
        </div>
        
       </div>
        <div className={`absolute w-full top-[100%] z-[3] transition-[transform] ${toggle?'translate-y-0':'-translate-y-[100%]'} py-8 px-4 bg-white z-0 `}>
           <ul className="w-full text-primary">
            <li className="w-full">
              <Link to={'/'} className="w-full block hover:bg-primary hover:text-white py-2 text-[1.5rem] font-medium text-center">Home</Link>
            </li>
            <li className="w-full">
              <Link to={'/'} className="w-full block hover:bg-primary hover:text-white py-2 text-[1.5rem] font-medium text-center">About</Link>
            </li>
            <li className="w-full">
              <Link to={'/'} className="w-full block hover:bg-primary hover:text-white py-2 text-[1.5rem] font-medium text-center">Blog</Link>
            </li>
            <li className="w-full">
              <Link to={'/'} className="w-full block hover:bg-primary hover:text-white py-2 text-[1.5rem] font-medium text-center">Contact</Link>
            </li>
             <li className="w-full">
              <Link to={'/login'} className="w-full block hover:bg-primary hover:text-white py-2 text-[1.5rem] font-medium text-center">Login</Link>
            </li>
            <li className="w-full">
              <Link to={'/sign-up'} className="w-full block bg-primary text-white py-2 text-[1.5rem] font-medium text-center">Signup</Link>
            </li>
           </ul>
        </div>
      </div>
      <div className={`w-full absolute h-[100vh] top-[100%] ${toggle?'block':'hidden'} z-[3] bg-transparent`} onClick={()=>setToggle(false)}></div>
    </nav>
  )
}

export default MobileNav