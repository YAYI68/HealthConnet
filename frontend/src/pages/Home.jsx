import { Fragment, useEffect } from "react";

import AboutUs from "../components/Home/AboutUs";
import Articles from "../components/Home/Articles";
import { Hero, Testimonial, Services } from "../components/Home";





export default function Home() {
   
  return (
    <Fragment>  
      <Hero />
      <Services />
      <AboutUs />
      <Testimonial />
      <Articles />
    </Fragment>
  );
}
