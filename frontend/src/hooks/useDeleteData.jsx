
import useAxiosPrivate from './useAxiosPrivate'
import useSecureDataFetcher from './useSecureDataFetcher'

function useDeleteData() {
    const axiosPrivate =  useAxiosPrivate()
      const fetchData = useSecureDataFetcher(key, url)
      const deleteData = async(id)=>{
         return await axiosPrivate.delete(`/${url}/${id}/`)
      }
  return {...fetchData,deleteData}
}

export default useDeleteData