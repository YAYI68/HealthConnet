
import { FaPen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import UserImg from '../../assets/images/default.png';
import { useEffect, useState } from 'react';
import { filteredInput } from '../../utils';
import { BASE_URL } from '../../utils/constant';
import useUpdateData from '../../hooks/useUpdateData';

const API_URL = 'doctor'
const DATA_KEY = 'doctorProfile';



function DoctorProfileForm() {
     const { data:doctor, error, isLoading,updateData,mutate } =  useUpdateData(DATA_KEY,API_URL)
     const [preview ,setPreview ] = useState();
     const [imgFile, setImgFile] = useState();
     const [values, setValues] = useState({
        firstname:'',
        lastname:'',
        gender:'',
        experience:'',
        field:'',
        hospital:'',
        location:'',
        phonenumber:'',
        state:'',
        country:'',
        bio:'',
        qualification:'',
     })

     const handleUpload = (event)=>{
        setImgFile(event.target.files[0])
     }
      
     useEffect (()=>{
        const reader = new FileReader()
        reader.addEventListener("load", () => {
        setPreview(reader.result)
        });      
    if(imgFile){
      reader.readAsDataURL(imgFile)
      } 
       return () => { reader.removeEventListener("load", () => {
          setPreview("")
          });}
      },[imgFile])

     console.log( 'type', typeof imgFile)
     console.log({preview})

     console.log({values})

     const handleOnChange = (event) =>{
        setValues((prev)=>({...prev,[event.target.name]:event.target.value}))
     }
    console.log({doctor})
    const navigate = useNavigate()

    const handleSubmit = async()=>{
        console.log({imgFile})
        const inputData = {...values,image:imgFile}
        const newData = filteredInput(inputData)
         console.log({newData})
         await updateData(newData)
         mutate()
    }
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full lg:w-[90%] relative overflow-scroll h-full'>
        <div className='flex w-full flex-col bg-white items-center lg:flex-row lg:justify-between sticky top-0 px-2 '>
            <div className='w-full lg:w-[60%]'>
                <h3 className='font-semibold lg:text-[1.2rem]'>User Information</h3>
                <p className='text-primary font-jost text-xs lg:text-[1rem]'>Enter the required information below to register. You can change it anytime. </p>
            </div>
            <div className='w-full lg:w-[15%] flex items-center mt-2 justify-between'>
                <button  onClick={()=>navigate('/dashboard/profile')} type="button" className='p-2 border border-primary rounded-md text-primary text-xs lg:text-[1rem]'>Cancel</button>
                <button onClick={handleSubmit} type="button" className='p-2 border border-primary bg-primary text-white rounded-md text-xs lg:text-[1rem]'>Save</button>
            </div>
        </div>
        <div className='w-full mt-4 flex flex-col lg:flex-row lg:justify-between gap-4 '>
            <div className='w-full flex items-center lg:items-baseline justify-center lg:w-[30%] lg:py-8'>
              
                <div className='h-[10rem] w-[10rem] lg:h-[15rem] lg:w-[15rem] rounded-[50%] relative overflow-hidden'>
                  {preview || doctor.image?
                  <img src={preview?preview:doctor.image} alt=""  className='h-full w-full' />
                  :
                  <img src={UserImg} alt=""  className='h-full w-full' />
                }
                  <label htmlFor="upload" className='absolute cursor-pointer bottom-8 right-8 lg:bottom-12 lg:right-12 rounded-[50%]  h-[2rem] bg-secondary w-[2rem] flex flex-col justify-center items-center'>
                        <FaPen  className='text-primary' />
                    <input type="file" onChange={handleUpload} id='upload' name="image" value="" className='hidden' />
                 </label>
                </div>
            </div>
           
            <div className='w-full lg:w-[60%]  p-4'>
                <form className='flex flex-col gap-2'>
                    <div className=''>
                    <label htmlFor="email" className='text-primary font-medium'>Email Address</label><br />
                    <input readOnly={true} type="email" id='email'  name="email" defaultValue={doctor.email} placeholder='youremail@mail.com' className='p-2 w-full outline-none border-primary border rounded-md' />
                    </div>
                    <div className=''>
                    <label for="email" className='text-primary font-medium'>Full Name</label><br />
                    <div className='w-full flex flex-col lg:flex-row gap-2 lg:justify-between'>
                    <input type="text"  name="firstname" onChange={handleOnChange} placeholder='First Name' defaultValue={doctor.firstname} className='p-2 w-full lg:w-[45%] outline-none border-primary border rounded-md' />
                    <input type="text"  name="lastname" onChange={handleOnChange} placeholder='Last name' defaultValue={doctor.lastname} className='p-2 w-full lg:w-[45%] outline-none border-primary border rounded-md' /> 
                    </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row gap-2 lg:justify-between'>
                        <div className='lg:w-[45%] w-full'>
                            <label htmlFor="" className='text-primary font-medium'>Phone Number</label><br/>
                            <input type="text" onChange={handleOnChange} name="phonenumber" defaultValue={doctor.phonenumber} placeholder='Phone Number' className='p-2 w-full  outline-none border-primary border rounded-md' />  
                        </div>
                        <div  className='lg:w-[45%] w-full'>
                            <label htmlFor="" className='text-primary font-medium'>Gender</label><br />
                            <select defaultValue={doctor.gender} onChange={handleOnChange} placeholder='Gender' name='gender' className='p-2 w-full outline-none border-primary border rounded-md'>
                                <option></option>
                                <option value="MALE" >Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>
                    </div>
                   
                    <div className=''>
                    <label htmlFor="" className='text-primary font-medium'>Medical Information</label><br />
                    <div className='w-full flex flex-col lg:flex-row gap-2 lg:justify-between lg:flex-wrap'>
                    <input type="text" defaultValue={doctor.qualification}  onChange={handleOnChange} name="qualification" placeholder='Qualification' className='p-2 w-full lg:w-[45%] outline-none border-primary border rounded-md' />
                    <input type="text" defaultValue={doctor.field} name="field" onChange={handleOnChange} placeholder='Specialization' className='p-2 w-full lg:w-[45%] outline-none border-primary border rounded-md' /> 
                    <input type="text" defaultValue={doctor.experience}  name="experience" onChange={handleOnChange} placeholder='Experience' className='p-2 w-full lg:w-[45%] outline-none border-primary border rounded-md' />
                    <textarea  name="bio" onChange={handleOnChange} defaultValue={doctor.bio} placeholder='Bio'  className='p-2 w-full lg:w-full outline-none border-primary border rounded-md' />
                    </div>
                    </div>
                    <div className=''>
                    <label htmlFor="" className='text-primary font-medium'>Medical center </label><br />
                    <div className='w-full flex flex-col lg:flex-row gap-2 lg:justify-between lg:flex-wrap'>
                    <select onChange={handleOnChange} defaultValue={doctor.country} placeholder='Country' name='country' className='p-2 w-full lg:w-[45%] outline-none border-primary border rounded-md'>
                         <option value="Nigeria" >Nigeria</option>
                         <option value="Nigeria" >Ghana</option>
                    </select>
                    <input type="text" onChange={handleOnChange} defaultValue={doctor.state} name="state" placeholder='State' className='p-2 w-full lg:w-[45%] outline-none border-primary border rounded-md' /> 
                    <input type="text" onChange={handleOnChange} defaultValue={doctor.hospital}  name="hospital" placeholder='Hospital/Medical Center' className='p-2 w-full lg:w-[45%] outline-none border-primary border rounded-md' /> 
                    <input type="text" onChange={handleOnChange} defaultValue={doctor.location}  name="location" placeholder='Hospital Address' className='p-2 w-full lg:w-full outline-none border-primary border rounded-md' />
                    </div>
                    </div>
                </form>
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default DoctorProfileForm