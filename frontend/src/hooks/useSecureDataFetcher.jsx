
import useSWR from 'swr'
import useAxiosPrivate from './useAxiosPrivate'

function useSecureDataFetcher(key,url) {
    const axiosPrivate = useAxiosPrivate()
    const  fetcher = async()=>{
      const {data} = await axiosPrivate.get(`/${url}`)
      return data
    }
    const data = useSWR(`${key}`, fetcher)
  return data
}

export default useSecureDataFetcher