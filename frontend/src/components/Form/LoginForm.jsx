import React, { useState } from "react";
import { TextField } from "../Form";
import { useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { axiosInstance } from "../../utils/axios";
import { useAuthContext } from "../../context/AuthContext";

 function LoginForm({userType}) {
  const { setAccessToken, setCSRFToken } =  useAuthContext()
  const navigate = useNavigate()
  const { state } = useLocation();

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
    agree: false,
  });

  const onChange = ({ target }) => {
    const { name, value, checked } = target;
    
    if (name !== "agree") {
      setLoginValues({
        ...loginValues,
        [name]: value,
      });
    } else {
      setLoginValues({
        ...loginValues,
        [name]: checked,
      });
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { email,password } = loginValues
      const user = {email,password}
    try{
         const response = await axiosInstance.post(`/login/`,user)
         setAccessToken(response?.data?.access_token)
         setCSRFToken(response.headers["x-csrftoken"])
         navigate(state.path ? state.path : '/dashboard/overview')
         toast.success("User successfully Login ");
    }
    catch(error){
        toast.error("Invalid Email/Password!");
        }
  };
  return (
    <div className="">
      <form action="" className="w-full p-4" onSubmit={handleSubmit}>
        
        <div className="mt-[1rem]">
          <TextField
            placeholder="Email"
            name="email"
            value={loginValues.email}
            onChange={onChange}
          />
        </div>
        <div className="mt-[1rem]">
          <TextField
            placeholder="Password"
            type="password"
            name="password"
            value={loginValues.password}
            onChange={onChange}
          />
        </div>
     
        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-primary rounded-2xl hover:bg-hover"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
export default React.memo(LoginForm)
