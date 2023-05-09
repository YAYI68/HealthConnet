import React, { Fragment } from 'react'

import {CgArrowRight} from "react-icons/cg"

import articleImg1 from '../../assets/images/EXercisess.webp'
import articleImg2 from '../../assets/images/mentalHealth.jpg'
import articleImg3 from '../../assets/images/medications.jpg'

const Articles = () => {
  let blogPosts = [
    {
      id: 1,
      title:
        'The Benefits of Regular Exercise: How a Healthy Lifestyle Can Improve Your Health',
      date: '2023-02-10',
      image: articleImg1,
      body: 'Regular exercise is a crucial component of a healthy lifestyle, and has been shown to have numerous benefits for both physical and mental health.',
    },
    {
      id: 2,
      title:
        'Mental Health and Wellbeing: Tips for Managing Stress, Anxiety, and Depression',
      date: '2023-03-28',
      image: articleImg2,
      body: 'Mental health and wellbeing are crucial components of overall health and happiness. Unfortunately, many people struggle with stress, anxiety, and depression.',
    },
    {
      id: 3,
      title: 'Understanding Your Medications: Tips for Safe and Effective Use',
      date: '2023-04-03',
      image: articleImg3,
      body: 'Medications are an important tool in managing many health conditions, but they can also be complex and confusing.',
    },
  ]

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
          {blogPosts.map((article) => (
            <div key={article.id} className="flex flex-col w-full gap-5 rounded-2xl overflow-hidden shadow">
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
          ))}
        </div>
      </section>
    </Fragment>
  )
}

export default Articles
