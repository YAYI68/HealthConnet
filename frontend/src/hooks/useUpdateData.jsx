import React from 'react'
import useAxiosPrivate from './useAxiosPrivate'
import useDataFetcher from './useDataFetcher'

function useUpdateData(key, url) {
      const axiosPrivate =  useAxiosPrivate()
      const fetchData = useDataFetcher(key, url)
      const updateData = async(inputData)=>{
         return await axiosPrivate.patch(`/${url}/`,inputData)
      }
  return {...fetchData,updateData}
}

export default useUpdateData