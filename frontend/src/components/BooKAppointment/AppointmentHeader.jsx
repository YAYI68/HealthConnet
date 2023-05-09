import { Select } from "../Form";
import { ServicesData } from "../../data";

import Doctor from "../../assets/svg/doctor_male.svg";
import { MdLocationPin } from "react-icons/md";
export default function AppointmentHeader() {
  const serviceTitle = ServicesData.map((item) => {
    return item.title;
  });
  console.log(serviceTitle);

  return (
    <>
      <div className="">
        <h3 className=" text-[1.3rem] md:text-[2rem] font-bold font-jost py-8 ">
          Find a Specialist!
        </h3>
        <div className="flex flex-col lg:flex-row  gap-2 justify-flex-start">
          <div className="relative">
            <Select
              dropDownData={serviceTitle}
              svgIcon={<MdLocationPin className="text-[1.2rem]" />}
              placeholder="select location"
            />
          </div>
          <div className="relative"><Select imageIcon={Doctor} dropDownData={serviceTitle} placeholder="select specialist"/></div>
        </div>
      </div>
    </>
  );
}
