import React, { useEffect, useRef, useState } from "react";
import { Combobox } from "@headlessui/react";
import { MdOutlineCheck } from "react-icons/md";

const dropDownData = [
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
];

export default function Select({dropDownData, imageIcon, svgIcon, placeholder}) {
  const [selectedPerson, setSelectedPerson] = useState(dropDownData[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? dropDownData
      : dropDownData.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <div className="">
        <div className={`flex items-center border border-primary rounded-[4rem] px-2`}>
          
          {svgIcon && svgIcon}
          {imageIcon && <img src={imageIcon} alt="" className="max-h-[1.5rem] max-w-[1.5rem]"/>}
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            className={`h-[2.5rem] outline-none   pl-4 w-[80%]`}
          />
        </div>

        <Combobox.Options className=" shadow-services-card w-full mt-2 rounded-[6px] py-2 absolute z-[100] bg-white" >
          {filteredPeople.map((person) => (
            <Combobox.Option
              key={person}
              value={person}
              className="hover:bg-secondary py-1 rounded-[6px] pl-2"
            >
              {({selected }) => (
                <div className={`${selected ? "bg-primary text-white" : "none"} p-1 flex items-center`}>
                  {person}
                  {selected && (
                    <span className="ml-auto text-white text-[1.2rem]">
                      <MdOutlineCheck />
                    </span>
                  )}
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
