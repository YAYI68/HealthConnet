import React from 'react'
import {CgArrowRight} from "react-icons/cg";


function Blog({article}) {
  return (  
            <div className="flex flex-col w-full gap-5 rounded-2xl overflow-hidden shadow">
              <div className="w-full min-h-[15rem] h-[15rem]">
                <img
                  src={article.image}
                  alt="articles"
                  className=" w-full h-full"
                />
              </div>
              <div className="flex flex-col flex-1 gap-3 p-3 justify-start">
                <div className=" font-jost bg-secondary text-primary font-bold rounded-sm p-1 w-fit">
                  {article.date}
                </div>
                <div className="font-jost font-[900]">{article.title}</div>
                <div className=" text-gray-600 font-inter">{article.body}</div>
                <a href="#" className=" text-primary font-bold mt-auto w-fit flex items-center">
                  Read more <span className='ml-2'><CgArrowRight className='text-primary text-[1.5rem]'/></span>
                </a>
              </div>
            </div>
  )
}

export default Blog