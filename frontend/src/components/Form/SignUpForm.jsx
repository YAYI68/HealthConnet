import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, CheckBox } from "../Form";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import  { axiosInstance } from "../../utils/axios";
import useError from "../../hooks/useFormValidator";


 function SignUpForm({userType}) {
  const navigate = useNavigate()
  const {validator,dispatch} =  useError()
  const [signUpValues, setSignUpValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    agree: false,
  });

  const onChange = ({ target }) => {
    const { name, value, checked } = target;
    
    if (name !== "agree") {
      setSignUpValues({
        ...signUpValues,
        [name]: value,
      });
    } else {
      setSignUpValues({
        ...signUpValues,
        [name]: checked,
      });
    }
  };

  const handleBlur = ({target})=>{
    const { type, value ,name} = target
    if(!value){
      dispatch({type:name,value})
    }
      
  }

  console.log(validator)

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {firstname,lastname,password,email} = signUpValues;
    const userInput = {
      first_name:firstname,
      last_name:lastname,
      password:password,
      role:userType,
      email:email
  }
  dispatch({type:'firstname',value:firstname})
  dispatch({type:'lastname',value:lastname})
  dispatch({type:'email',value:email})
  dispatch({type:'password',value:password})

  if(!Object.values(validator).includes(true)){
    try{
      const {data} = await axiosInstance.post(`/signup/`,userInput)    
      if(data){
        toast.success('Account successfully Registered, please log in');
        navigate("/login");
        setSignUpValues()
      }
   }
  catch(error){
     toast.error(error.response.data?.email?error.response.data?.email?.[0]:'Invalid Credentials ');
    }
  }
  return
  }
  return (
    <div>
      <form action="" className="w-full" onSubmit={handleSubmit}>

        <div className="flex flex-col lg:flex-row relative gap-x-8 gap-y-4 mt-[2rem]">
          <div className="lg:w-1/2">
            <TextField
              placeholder="First Name"
              name="firstname"
              value={signUpValues.firstname}
              onChange={onChange}
              error={validator.firstname}
              onBlur={handleBlur}
            />
            {validator.firstname ?
            <small className="text-[.65rem] text-red-700">Text should be between 3 and 20 characters </small>
            :""
            }
          </div>
          <div className="lg:w-1/2 ">
            <TextField
              placeholder="Last Name"
              name="lastname"
              value={signUpValues.lastname}
              onChange={onChange}
              error={validator.lastname}
              onBlur={handleBlur}
            />
            {validator.lastname ?
            <small className="text-[.65rem] text-red-700">Text should be between 3 and 20 characters </small>
            :""
            }
          </div>
        </div>
        <div className="mt-[1rem]">
          <TextField
            placeholder="Email"
            name="email"
            value={signUpValues.email}
            onChange={onChange}
            error={validator.email}
            onBlur={handleBlur}
          />
           {validator.email ?
            <small className="text-[.65rem] text-red-700">Please enter a valid email </small>
            :""
            }
        </div>
        <div className="mt-[1rem]">
          <TextField
            placeholder="Password"
            type="password"
            name="password"
            value={signUpValues.password}
            onChange={onChange}
            error={validator.password}
            onBlur={handleBlur}
          />
          {validator.password ?
            <small className="text-[.65rem] text-red-700"> Password should be more than 5 characters long</small>
            :""
            }
        </div>

        <div className="flex items-center relative gap-4 mt-8">
          <CheckBox name="agree" value={signUpValues.agree} onChange={onChange} />{" "}
          <p>
            I agree to the{" "}
            <Link to="#" className="text-primary hover:underline">
              term of service
            </Link>{" "}
            and{" "}
            <Link to="#" className="text-primary hover:underline">
              privacy policy
            </Link>{" "}
          </p>
        </div>

        <div className="mt-4">
          <button
            disabled={false}
            type="submit"
            className="bg-primary rounded-2xl w-full  py-3 text-white font-bold hover:bg-hover"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
export default SignUpForm
