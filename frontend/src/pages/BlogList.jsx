import React, { Fragment, useState } from 'react'
import { blogPosts } from '../data'
import { Blog } from '../components/Blog'
import useDataFetcher from '../hooks/useDataFetcher';

const blog_key = 'api_blog';
const blog_url  = 'blog/';

function BlogList() {
  const [pageNum,setPageNum] = useState('')

  const {data,error,isLoading} = useDataFetcher(`${blog_key}/${pageNum}`,`${blog_url}${pageNum?`?page=${pageNum}`:''}`)
  

  const paginate = (link)=>{
    const page = link && link.includes('=')?link.split('=')[1]:''
    setPageNum(page)
  }

  if(isLoading){
   return <h1>Loading...</h1>
  }


  return (
    <Fragment>
    <section className='min-h-screen w-full flex flex-col items-center py-4'>
      <div className='w-[80%] py-4 flex flex-col lg:flex-row gap-7 flex-wrap'>
         {data.results.map((article) => (
            <Blog article={article} key={article.id} />
          ))}
      </div>
        <div className='w-[80%] lg:w-[30%] flex items-center justify-center gap-4'>
            <button disabled={!data.previous} onClick={()=>paginate(data.previous)} type="button" className='border-primary   p-2 px-4 rounded-md border'>prev</button>
            <button disabled={!data.next} onClick={()=>paginate(data.next)} type="button" className='border-primary  p-2 px-4 rounded-md border'>next</button>
          </div>
    </section>
    </Fragment>
 
  )
}

export default BlogList