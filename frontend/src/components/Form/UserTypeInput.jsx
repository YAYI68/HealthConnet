import React, { useState } from "react";
import DoctorImg from "../../assets/svg/doctor.svg";
import PatientImg from "../../assets/svg/man.svg";
import RadioButton from "./RadioButton";

export default function UserTypeInput({userType, handleUserType}) {
  const handleUser = ({target}) => {
    handleUserType(target.value)
  };

  const handleUserCardClick = (user)=>{
    user == "DOCTOR"? handleUserType("DOCTOR") : handleUserType("PATIENT")
  }
  return (
    <div className="flex lg:w-[50%] flex-col relative mx-auto mt-4 gap-2">
      <div className="text-center font-bold">
        <p>Choose Account Type</p>
      </div>

      <div className="flex gap-4">
      <div
          className={`w-1/2 max-w-[9rem] min-h-[10rem] cursor-pointer relative flex flex-col flex-1  border-2 ${
            userType == "DOCTOR" ? "shadow-user-select-shadow" : "none"
          }   rounded-md items-center justify-center`}
          onClick={()=>handleUserCardClick("DOCTOR")}

        >
          <img src={DoctorImg} alt="" className="h-[60%] md:h-[90%]" />
          <p className="font-bold text-primary ">Doctor</p>
          <div className=" rounded-full  absolute top-1 right-1">
            <RadioButton name="user" value="DOCTOR" user={userType} onChange={handleUser} />
          </div>
        </div>
        <div
          className={`w-1/2 max-w-[9rem] min-h-[10rem] cursor-pointer relative flex flex-col flex-1  border-2 ${
            userType == "PATIENT" ? "shadow-user-select-shadow" : "none"
          }   rounded-md items-center justify-center`}
          onClick={()=>handleUserCardClick("PATIENT")}

        >
          <img src={PatientImg} alt="" className="h-[60%] md:h-[90%]" />
          <p className="font-bold text-primary ">Patient</p>
          <div className=" rounded-full  absolute top-1 right-1">
            <RadioButton name="user" value="PATIENT" user={userType} onChange={handleUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
