import { useEffect, useState } from "react";
import { filteredInput } from "../../utils";
import UserImg from "../../assets/images/default.png";
import { FaPen } from "react-icons/fa";
import { SubmitButton } from "../UI";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import { toast } from "react-toastify";

const CompleteDoctorForm = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [preview, setPreview] = useState();
  const [imgFile, setImgFile] = useState();
  const [values, setValues] = useState({
    bio: "",
    gender: "",
    experience: "",
    field: "",
    hospital: "",
    location: "",
    state: "",
    country: "",
    qualification: "",
    price: "",
  });

  const handleUpload = (event) => {
    setImgFile(event.target.files[0]);
  };

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setPreview(reader.result);
    });
    if (imgFile) {
      reader.readAsDataURL(imgFile);
    }
    return () => {
      reader.removeEventListener("load", () => {
        setPreview("");
      });
    };
  }, [imgFile]);

  const handleOnChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const inputData = { ...values, image: imgFile, userId };
    const newData = filteredInput(inputData);
    console.log({ newData });
    try {
      const response = await axiosInstance.post(`/doctor/register/`, newData);
      if (response.status === 201) {
        toast.success("Profile successfully updated,Please kindly Login");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-4 flex flex-col lg:flex-row lg:justify-between gap-4 ">
      <div className="w-full flex items-center lg:items-baseline justify-center lg:w-[30%] lg:py-8">
        <div className="h-[10rem] w-[10rem] lg:h-[15rem] lg:w-[15rem] rounded-[50%] relative overflow-hidden">
          <img
            src={preview ? preview : UserImg}
            alt=""
            className="h-full w-full"
          />
          <label
            htmlFor="upload"
            className="absolute cursor-pointer bottom-8 right-8 lg:bottom-12 lg:right-12 rounded-[50%]  h-[2rem] bg-secondary w-[2rem] flex flex-col justify-center items-center"
          >
            <FaPen className="text-primary" />
            <input
              type="file"
              onChange={handleUpload}
              id="upload"
              name=""
              value=""
              className="hidden"
            />
          </label>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="">
          <label htmlFor="" className="text-primary font-medium">
            Medical Information
          </label>
          <hr className="w-full border border-primary my-2" />
          <div className="w-full flex flex-col lg:flex-row gap-2 lg:justify-between lg:flex-wrap">
            <div className="lg:w-[45%] w-full">
              <label htmlFor="" className="text-primary font-medium">
                Gender
              </label>
              <br />
              <select
                onChange={handleOnChange}
                name="gender"
                placeholder="Gender"
                className="p-2 w-full  outline-none border-primary border rounded-md"
              >
                <option value=""></option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
            <div className="lg:w-[45%] w-full">
              <label htmlFor="" className="text-primary font-medium">
                Country
              </label>
              <br />
              <select
                onChange={handleOnChange}
                name="country"
                placeholder="Country"
                className="p-2 w-full  outline-none border-primary border rounded-md"
              >
                <option value=""></option>
                <option value="Nigeria">Nigeria</option>
              </select>
            </div>
            <div className="lg:w-[45%] w-full">
              <label htmlFor="" className="text-primary font-medium">
                Qualification
              </label>
              <br />
              <input
                type="text"
                defaultValue={""}
                onChange={handleOnChange}
                name="qualification"
                placeholder="E.g Bsc Dentistry"
                className="p-2 w-full outline-none border-primary border rounded-md"
              />
            </div>
            <div className="lg:w-[45%] w-full">
              <label htmlFor="" className="text-primary font-medium">
                Field / Specialization
              </label>
              <br />
              <input
                type="text"
                defaultValue={""}
                onChange={handleOnChange}
                name="field"
                placeholder="E.g Dentist"
                className="p-2 w-full outline-none border-primary border rounded-md"
              />
            </div>
            <div className="lg:w-[45%] w-full">
              <label htmlFor="" className="text-primary font-medium">
                Appointment Fee <span className="text-xs">(in naira)</span>
              </label>
              <br />
              <input
                type="text"
                defaultValue={""}
                onChange={handleOnChange}
                name="price"
                placeholder="E.g #5,000/appointment"
                className="p-2 w-full outline-none border-primary border rounded-md"
              />
            </div>

            <div className="lg:w-[45%] w-full">
              <label htmlFor="" className="text-primary font-medium">
                Years of Experience
              </label>
              <br />
              <input
                type="text"
                defaultValue={""}
                onChange={handleOnChange}
                name="experience"
                placeholder="Experience"
                className="p-2 w-full outline-none border-primary border rounded-md"
              />
            </div>
            <div className="w-full">
              <label htmlFor="" className="text-primary font-medium">
                Bio
              </label>
              <br />
              <textarea
                name="bio"
                onChange={handleOnChange}
                defaultValue={""}
                placeholder="Bio"
                className="p-2 w-full lg:w-full outline-none border-primary border rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="">
          <label htmlFor="" className="text-primary font-medium">
            Medical center{" "}
          </label>
          <hr className="w-full border border-primary my-2 " />
          <div className="w-full flex flex-col lg:flex-row gap-2 lg:justify-between lg:flex-wrap">
            <div className="lg:w-[45%] w-full">
              <label htmlFor="" className="text-primary font-medium">
                State
              </label>
              <br />
              <input
                type="text"
                onChange={handleOnChange}
                defaultValue={""}
                name="state"
                placeholder="State"
                className="p-2 w-full outline-none border-primary border rounded-md"
              />
            </div>
            <div className="lg:w-[45%] w-full">
              <label htmlFor="" className="text-primary font-medium">
                Hospital/Medical Center
              </label>
              <br />
              <input
                type="text"
                onChange={handleOnChange}
                defaultValue={""}
                name="hospital"
                placeholder="Hospital/Medical Center"
                className="p-2 w-full outline-none border-primary border rounded-md"
              />
            </div>

            <div className=" w-full">
              <label htmlFor="" className="text-primary font-medium">
                Hospital Address
              </label>
              <br />
              <input
                type="text"
                onChange={handleOnChange}
                defaultValue={""}
                name="location"
                placeholder="Hospital Address"
                className="p-2 w-full outline-none border-primary border rounded-md"
              />
            </div>
          </div>
          <div className="mt-2 w-full">
            <SubmitButton text={"Submit"} className={""} loading={loading} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompleteDoctorForm;
