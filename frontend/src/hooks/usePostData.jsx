
import useAxiosPrivate from './useAxiosPrivate'
import useSecureDataFetcher from './useSecureDataFetcher'

function usePostData(key, url) {
      const axiosPrivate =  useAxiosPrivate()
      const fetchData = useSecureDataFetcher(key, url)
      const postData = async(inputData)=>{
         return await axiosPrivate.post(`/${url}/`,inputData)
      }
  return {...fetchData,postData}
}

export default usePostData