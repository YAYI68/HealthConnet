import React from 'react'
import useAxiosPrivate from './useAxiosPrivate'
import useDataFetcher from './useDataFetcher'
import useSecureDataFetcher from './useSecureDataFetcher'

function useUpdateData(key, url) {
      const axiosPrivate =  useAxiosPrivate()
      const fetchData = useSecureDataFetcher(key, url)
      const updateData = async(inputData)=>{
         return await axiosPrivate.patch(`/${url}/`,inputData)
      }
  return {...fetchData,updateData}
}

export default useUpdateData