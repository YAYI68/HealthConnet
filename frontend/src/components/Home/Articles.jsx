import React, { Fragment, useEffect } from 'react';
import { Blog } from '../Blog';
import { blogPosts } from '../../data';
import { axiosInstance } from '../../utils/axios';
import useDataFetcher from '../../hooks/useDataFetcher';




const Articles = ({blogs}) => {
    

  return (
    <Fragment>
      <section
        id="articles"
        className="flex flex-col w-[95%] md:w-[80%] mx-auto justify-center items-center p-2 md:p-8 lg:p-10 gap-10"
      >
        <h3
          className="uppercase relative self-center font-bold font-jost text-[1rem] md:text-[1.3rem] 
      before:block before:absolute before:w-[40%] before:h-[3px]
       before:bg-primary before:bottom-0 before:left-[50%] before:translate-x-[-50%] mb-4"
        >
          Latest news & articles
        </h3>
        <div className="flex flex-col lg:flex-row gap-7">
          {blogs.map((article) => (
            <Blog article={article} key={article.id} />
          ))}
        </div>
      </section>
    </Fragment>
  )
}

export default Articles
