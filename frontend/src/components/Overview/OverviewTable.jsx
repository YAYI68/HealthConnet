import { MdOutlineCancel, MdOutlineCheckCircleOutline} from 'react-icons/md';



function OverviewTable() {
  return (
    <table className='w-full '>
    <thead className='w-full'>
     <tr className='w-full text-[1rem] border-b-2 overflow-x-scroll'>
       <th className='p-3  text-left'>
           <p>profile</p>
       </th>
       <th className='p-3  text-left'>
           <p>Service</p>
       </th>
       <th className='p-3  text-left'>
           <p>Date</p>
       </th>
       <th className='p-3  text-left'>
           <p>Time</p>
       </th>
       <th className='p-3  text-left'>
           <p>Action</p>
       </th>
      </tr>
     </thead>
   <tbody>
       <tr>
           <td className='p-3  text-left flex items-center gap-2'>
                <div className='h-[2.5rem] w-[2.5rem] bg-red-300 overflow-hidden rounded-[50%]'>
                   <img src='' alt='' />
                </div>
                <p className='text-[.9rem]'>Dr. Rita Ora</p>
           </td>
           <td className='p-3  text-left'>
                <p className='text-[.9rem]'>Dermatologist</p>
           </td>
           <td className='p-3  text-left'>
              <p className='text-[.9rem]'>jun 12, 2022 </p>
           </td>
           <td className='p-3  text-left'>
              <p className='text-[.9rem]'>10:30 AM </p>
           </td>
           <td className='p-3  text-left'>
              <div className='w-full flex items-center gap-2'>
               <button type="">
                   <MdOutlineCancel className='h-6 w-6 fill-red-400' />
               </button>
               <button type="">
                   <MdOutlineCheckCircleOutline className='h-6 w-6 fill-green-300' />
               </button>
              </div>
           </td>
       </tr>
   
   </tbody>
</table>
  )
}

export default OverviewTable