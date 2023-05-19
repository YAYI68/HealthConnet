import { Fragment, useEffect } from "react";

import AboutUs from "../components/Home/AboutUs";
import Articles from "../components/Home/Articles";
import { Hero, Testimonial, Services } from "../components/Home";
import useDataFetcher from "../hooks/useDataFetcher";


const blog_key = 'api_blog';
const blog_url  = 'blog/?page_size=3';


export default function Home() {
  const {data,error,isLoading} = useDataFetcher(blog_key,blog_url)

  if (isLoading){
    return <h1>Loading....</h1>
  }
   
 
  return (
    <Fragment>  
      <Hero />
      <Services />
      <AboutUs />
      <Testimonial />
      <Articles blogs={data.results} />
    </Fragment>
  );
}
