import React from "react";
import { useNavigate, Link } from "react-router-dom";
import DoctorImg from "../../assets/images/hero2.png";
import { MdStarRate, MdStarBorder } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";

export default function SpecialistCard({ id }) {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/appointment/detail`);
  }
  return (
    <div
      id={id}
      className="card-hover w-[95%] sm:w-[30%] md:w-[45%] lg:w-[30%] justify-between 
    flex relative rounded-xl shadow-services-card  cursor-pointer gap-4 pr-2"
      
    >
      <div className="flex-1 basis-[30%] flex items-center justify-center rounded-2xl bg-secondary">
        <img src={DoctorImg} alt="doctor image" className="max-h-[80%] " />
      </div>
      <div className="flex-1 basis-[70%] flex flex-col gap-4">
        <p className="text-primary text-sm md:text-lg lg:text-xl font-[900] mt-2">
          Dr. Sunday Anderson
        </p>
        <div className="w-fit p-1 flex flex-col gap-1 items-center border border-primary rounded-md text-xs">
          <p>Mon - Fri</p>
          <p>8am - 5pm</p>
        </div>
        <div className="flex">
          {Array.from({ length: 5 }, () => {
            return <MdStarRate className="text-primary" />;
          })}
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center relative">
          <p className="text-[.8rem] flex items-center text-primary font-[500] w-full lg:w-4/6">
            <span>
              <MdLocationPin />
            </span>{" "}
            unn teaching hospital
          </p>

          <button
            className="w-full lg:w-2/6 text-xs bg-primary text-white px-1 py-2 rounded-md "
            onClick={handleNavigate}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
