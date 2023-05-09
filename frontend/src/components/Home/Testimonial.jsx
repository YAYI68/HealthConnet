import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft } from "react-icons/fa";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";
import { useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

import TestimonialCard from "./TestimonialCard";
import {testmonialData} from "../../data/index"

function SlideNextButton() {
  const swiper = useSwiper();
  return (
    <button className="" onClick={() => swiper.slideNext()}>
      {" "}
      <AiFillRightCircle className="text-[2.5rem] text-primary" />
    </button>
  );
}
function SlidePrevButton() {
  const swiper = useSwiper();
  return (
    <button className="" onClick={() => swiper.slidePrev()}>
      {" "}
      <AiFillLeftCircle className="text-[2.5rem] text-primary" />
    </button>
  );
}

export default function Testimonial() {
  
  return (
    <section className="bg-secondary w-[95%] md:w-[80%] mx-auto mt-[6rem] mb-8 flex flex-col px-2 py-8 lg:px-8 lg:py-8 rounded-2xl relative">
      <h3
        className="relative self-center font-bold font-jost text-[1.3rem] 
      before:block before:absolute before:w-[50%] before:h-[3px]
       before:bg-primary before:bottom-0 before:left-[50%] before:translate-x-[-50%] mb-4"
      >
        TESTIMONIALS
      </h3>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        speed={3000}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-[95%] lg:w-[50%]  flex rounded-2xl h-[15rem]"
        // onSwiper={(swiper) => handleSwipe(swiper)}
      >
        {testmonialData?.map((item)=>{
          
          return (
            <SwiperSlide key={item.id} className="text-center   bg-white text-[18px] min-h-[10rem]  flex items-center justify-center rounded-2xl">
            <TestimonialCard details={item}/>
          </SwiperSlide>
          )
        })}
       
       
       

        <div className="absolute hidden lg:block top-[80%] z-50">
          <SlidePrevButton />
        </div>
        <div className="absolute hidden lg:block top-[80%] right-0  z-50">
          <SlideNextButton />
        </div>
      </Swiper>
      <div className="absolute top-[-1.5rem]">
        <FaQuoteLeft className="text-[3rem] text-primary" />
      </div>
    </section>
  );
}
