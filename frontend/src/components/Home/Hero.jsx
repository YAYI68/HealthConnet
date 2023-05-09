import React from "react";
import { useNavigate } from "react-router-dom";
import HeroImg from "../../assets/images/hero.png";
import { successHistory } from "../../data";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center bg-secondary">
      <div className=" flex flex-col md:flex-row  md:items-center md:w-[95%] lg:w-[80%] sm:h-[80vh] md:h-[30vh] lg:h-[35vh] xl:h-[70vh]">
        <div className="p-4 flex flex-col gap-4 ">
          <h1 className="text-[1.8rem] sm:text-[2.5rem]  font-jost font-bold text-primary lg:text-[2.5rem] xl:text-[3.5rem]">
            Your Health is Our <br /> Top Priority{" "}
          </h1>
          <div>
            <p className="text-[1.2rem] text-gray-600 font-inter">
              Our skilled doctor have tremendous experience with wide range of disease to serve the
              needs of our patients
            </p>
          </div>
          <button className="w-fit py-4 text-center md:self-start md:text-[1.2rem] bg-primary px-4 text-white rounded-md" onClick={()=>navigate("/appointment")}>
            Book Appointment
          </button>
        </div>
        <div className="w-full h-[20rem]  md:h-full relative flex items-center">
          <div className="min-w-[14rem] min-h-[14rem] lg:min-w-[22rem] lg:min-h-[22rem]  bg-circle  rounded-[50%] border-none absolute z-0  left-[50%] translate-x-[-50%]"></div>
          <img src={HeroImg} alt="" className="h-full w-full object-contain absolute z-[2] left-[50%] translate-x-[-50%]" />
        </div>
      </div>
      <div className="w-[80%] md:w-full md:bg-primary z-[2] flex justify-center -translate-y-[.5rem] md:translate-y-0 md:h-[15vh]">
        <div className="w-[80%] bg-primary  flex flex-col justify-between md:flex-row gap-2 items-center ">
          {successHistory.map((success, i) => {
            return (
              <div
                key={i}
                className="w-[70%] md:w-[20%] p-4 flex flex-col items-center text-center"
              >
                <h3 className="text-[2rem] md:text-[2rem] lg:text-[2.5rem] text-white font-jost">
                  {success.value}
                </h3>
                <p className="text-white  ">{success.name}</p>
              </div>
            );
          })}
      </div>
      </div>
    </div>
  );
}
