import React, { Fragment, useMemo } from "react";
import { ImFacebook } from "react-icons/im";
import { BsInstagram, BsTwitter } from "react-icons/bs";

const FooterCard = ({ title, array }) => {
  return (
    <div className="flex flex-col ">
      <h3 className="text-[1.5rem] font-jost font-bold">{title}</h3>
      <ul className="flex flex-col gap-2 mt-2">
        {array?.map((item) => {
          return (
            <li key={item.id}>
              <a href="#" className="hover:text-[#000]">
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Footer = () => {
  const contactUs = useMemo(() => {
    return [
      { text: "+2348125000000", id: 1 },
      { text: "healthconnect@gmail.com", id: 2 },
      { text: "182 Ijaya BLVD, Ojuta", id: 3 },

      { text: "Lagos, Nigeria", id: 4 },
    ];
  }, []);

  const services = useMemo(() => {
    return [
      { text: "Home", id: 1 },
      { text: "About", id: 2 },
      { text: "Services", id: 3 },
      { text: "Blog", id: 4 },
    ];
  }, []);
  const information = useMemo(() => {
    return [
      { text: "About Us", id: 1 },
      { text: "Privacy Policy", id: 2 },
      { text: "Terms & Conditions", id: 3 },
      { text: "FAG", id: 4 },
    ];
  }, []);

  return (
    <Fragment>
      <footer className={` bg-primary w-full  text-white flex flex-col py-4 px-4 relative`}>
        <div className="flex flex-col md:flex-row relative w-full lg:w-[80%] mx-auto gap-x-4 gap-y-4 flex-wrap">

          
          <a href="#" className={` text-[1.5rem] font-jost basis-[18%] md:basis-[30%] lg:basis-[18%]  font-bold w-full   flex-[1]`}>
            HealthConnect
          </a>

            <div className="flex-1 basis-[18%] md:basis-[30%] lg:basis-[18%]"><FooterCard title="Contact Us" array={contactUs} /></div>
          
          

            <div className="flex-1 basis-[18%] md:basis-[30%] lg:basis-[18%]"><FooterCard title="Services" array={services} /></div>          
            <div className="flex-1 basis-[18%] md:basis-[30%] lg:basis-[18%]"><FooterCard title="Information" array={information} /></div>          

          <div className="flex flex-col w-full md:w-1/3  flex-1 basis-[18%] md:basis-[30%] lg:basis-[18%]">
            <h3 className="text-[1.5rem] font-jost font-bold">Follow Us</h3>
            <ul className="flex gap-4 mt-2">
              <li>
                <a href="">
                  <ImFacebook size={24} />
                </a>
              </li>
              <li>
                <a href="">
                  <BsInstagram size={24} />
                </a>
              </li>
              <li>
                <a href="">
                  <BsTwitter size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-[.7rem] lg:text-[1rem] mt-8">©HealthConnect 2023, All rights reserved</div>
      </footer>
    </Fragment>
  );
};

export default Footer;
