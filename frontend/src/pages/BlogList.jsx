import React from 'react'
import { blogPosts } from '../data'
import { Blog } from '../components/Blog'

function BlogList() {
  return (
    <section className='min-h-screen w-full flex flex-col items-center'>
      <div className='w-[80%] py-4 flex flex-col lg:flex-row gap-7'>
         {blogPosts.map((article) => (
            <Blog article={article} key={article.id} />
          ))}
      </div>
    </section>
  )
}

export default BlogList