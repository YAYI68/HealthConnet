
import useAxiosPrivate from './useAxiosPrivate'
import useSecureDataFetcher from './useSecureDataFetcher'

function useUpdateData(key, url) {
      const axiosPrivate =  useAxiosPrivate()
      const fetchData = useSecureDataFetcher(key, url)
  return {...fetchData}
}

export default useUpdateData