import React from 'react'
import useAxiosPrivate from './useAxiosPrivate'
import useSWR from 'swr'

function useDataFetcher(key,url) {
    const axiosPrivate = useAxiosPrivate()
    const  fetcher = async()=>{
      const {data} = await axiosPrivate.get(`/${url}/`)
      return data
    }
    const data = useSWR(`${key}`, fetcher)
  return data
}

export default useDataFetcher