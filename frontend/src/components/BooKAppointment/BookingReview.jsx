import DoctorImg from "../../assets/images/hero2.png";

function BookingReview() {
  return (
    <div className='w-full rounded-md bg-secondary p-2 flex flex-col gap-2 lg:w-[45%] lg:justify-between'>
               <div className='w-full flex gap-4 '>
                <div className='h-[3rem] w-[3rem] rounded-[50%] overflow-hidden'>
                  <img src={DoctorImg} alt="doctor image" className=" w-full h-full " />
                </div>
                <div>
                  <p>Yayi Abiodun</p>
                   <small>1 day ago</small>
                </div>
               </div>
               <p className='w-full '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p> 
            </div>
  )
}

export default BookingReview