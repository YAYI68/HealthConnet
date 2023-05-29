import { Select } from "../Form";
import { NigeriaState, ServicesData } from "../../data";

import Doctor from "../../assets/svg/doctor_male.svg";
import { MdLocationPin } from "react-icons/md";
import SearchInput from "../UI/SearchInput";
import DropDownSelect from "../Form/DropDownSelect";





export default function AppointmentHeader({getLocation,getQuery}) {
  const serviceTitle = NigeriaState.map((item) => {
    return item;
  });
  return (
    <>
      <div className=" w-full bg-secondary p-2 rounded-md">
        <h3 className=" text-[1.3rem] md:text-[2rem] font-bold font-jost py-8 ">
          Find a Specialist!
        </h3>
        <div className="flex flex-col lg:flex-row  gap-2 justify-flex-start">
          <div className="relative w-full lg:w-[20%]">
            {/* <Select
             onSelect={getLocation}
              dropDownData={serviceTitle}
              svgIcon={<MdLocationPin className="text-[1.2rem] text-primary" />}
              placeholder="select location"
            /> */}
            <DropDownSelect 
              defaultValue={'Lagos'}
              svgIcon={<MdLocationPin className="text-[1.2rem] text-primary" />}
              onChange={getLocation}
              options={NigeriaState}
            />
          </div>
           <div className="w-full lg:w-[60%] border border-primary rounded-md overflow-hidden">
             <SearchInput
              placeholder={'Search for your Doctor or Specialty'}
              onSubmit={getQuery}
             />
           </div>
        </div>
      </div>
    </>
  );
}
