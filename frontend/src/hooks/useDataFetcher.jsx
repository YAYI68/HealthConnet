

import useSWR from 'swr'
import { axiosInstance } from '../utils/axios'

function useDataFetcher(key,url,options) {
    const  fetcher = async()=>{
      const {data} = await axiosInstance.get(`/${url}`)
      return data
    }
    const data = useSWR(`${key}`, fetcher,options)
  return data
}

export default useDataFetcher