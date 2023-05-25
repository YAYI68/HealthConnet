import React, {useState,useEffect, Fragment} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin, LoginForm, SignUpForm, UserTypeInput } from "../components/Form";

import ConsultantImg from "../assets/svg/medical-consultant.svg";
import { useAuthContext } from "../context/AuthContext";

export default function Register() {
  const { pathname,state } = useLocation();
  const { accessToken } = useAuthContext()
  const navigate = useNavigate()
  const [userType, setUserType] = useState("DOCTOR")


  const authUser = !!accessToken

 function onChangeUserType(userType){
     setUserType(userType)
 }

useEffect(()=>{
  if(authUser) navigate(state?.pathname || '/')
},[authUser])


  return (
    <div className="md:bg-primary flex w-[80%] md:w-[100%]  min-h-[100vh] mx-auto relative ">
      <div className="relative lg:w-2/5 md:w-2/4 hidden md:flex px-4">
        <p className="w-full mt-8 text-[2rem] font-extrabold text-white capitalize">
          Connect with the best <br /> specialist all over the country
        </p>
        <img src={ConsultantImg} alt="" className="absolute bottom-0 max-w-[30rem]"/>
      </div>

      <div className="bg-white w-full md:w-2/4 lg:w-3/5 md:p-[1rem_4rem] relative rounded-[2rem]">
        {pathname === "/login" ? (
          <h2 className=" font-[900] text-[1.5rem] mt-4 mb-[3rem]">Sign In</h2>
        ) : (
          <Fragment>
          <h2 className="mt-[3rem] font-[900] text-[1.5rem]">Create Account</h2>
          <UserTypeInput userType= {userType} handleUserType={onChangeUserType}/>
          </Fragment>
        )}
        {pathname == "/sign-up" ? <SignUpForm userType={userType}/> : <LoginForm userType={userType}/>}
        {/* sign up with google */}

        <div className="mt-8">
         <p className="text-center mt-6 text-[.9rem] mb-4">
          {pathname === "/login" ? "Don't have an account?" : "Already have an account"}{" "}
          <Link to={pathname === "/login"? "/sign-up": "/login"} className="text-primary hover:underline">{pathname === "/login"? "Sign Up": "Sign in"}</Link>
         </p>
        </div>
      </div>
    </div>
  );
}
