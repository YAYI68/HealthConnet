import { useEffect, useState } from "react";
import { filteredInput } from "../../utils";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserImg from "../../assets/images/default.png";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";

const CompletePatientForm = ({ userId }) => {
  const axiosPrivate = useAxiosPrivate();
  const [preview, setPreview] = useState();
  const [imgFile, setImgFile] = useState();
  const [values, setValues] = useState({
    gender: "",
    state: "",
    country: "",
    blood_group: "",
    age: "",
    genotype: "",
    medical_history: "",
  });
  const navigate = useNavigate();

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
    const inputData = { ...values, image: imgFile, userId };
    const newData = filteredInput(inputData);
    try{
      const response = await axiosInstance.patch(`/patient/register/`, newData);
      if (response.status === 200) {
        toast.success("Profile successfully updated,Please kindly Login");
        navigate("/login");
      }
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
      <form className="flex flex-col gap-2">
        <div className="w-full flex flex-col lg:flex-row gap-2 lg:justify-between">
          <div className="lg:w-[45%] w-full">
            <label htmlFor="" className="text-primary font-medium">
              Gender
            </label>
            <br />
            <select
              onChange={handleOnChange}
              defaultValue={""}
              name="gender"
              className="p-2 w-full  outline-none border-primary border rounded-md"
            >
              <option></option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          <div className="lg:w-[45%] w-full">
            <label htmlFor="" className="text-primary font-medium">
              Age
            </label>
            <br />
            <input
              type="text"
              onChange={handleOnChange}
              name="age"
              defaultValue={""}
              placeholder="Age"
              className="p-2 w-full  outline-none border-primary border rounded-md"
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-2 lg:justify-between lg:flex-wrap">
          <div className="lg:w-[45%] w-full">
            <label htmlFor="" className="text-primary font-medium">
              Country
            </label>
            <br />
            <select
              onChange={handleOnChange}
              name="country"
              className="p-2 w-full  outline-none border-primary border rounded-md"
            >
              <option value="Nigeria">Nigeria</option>
            </select>
          </div>
          <div>
            <label htmlFor="" className="text-primary font-medium">
              State
            </label>
            <br />
            <input
              type="text"
              name="state"
              defaultValue={""}
              onChange={handleOnChange}
              placeholder="State"
              className="p-2 w-full  outline-none border-primary border rounded-md"
            />
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-2 lg:justify-between lg:flex-wrap">
          <div>
            <label htmlFor="" className="text-primary font-medium">
              Blood Group
            </label>
            <br />
            <input
              type="text"
              defaultValue={""}
              name="blood_group"
              onChange={handleOnChange}
              placeholder="Blood Group"
              className="p-2 w-full outline-none border-primary border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="" className="text-primary font-medium">
              Marital Status
            </label>
            <br />
            <input
              type="text"
              defaultValue={""}
              name="marital_status"
              onChange={handleOnChange}
              placeholder="Marital Status"
              className="p-2 w-full outline-none border-primary border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="" className="text-primary font-medium">
              Genotype
            </label>
            <br />
            <input
              type="text"
              name="genotype"
              defaultValue={""}
              onChange={handleOnChange}
              placeholder="Genotype"
              className="p-2 w-full outline-none border-primary border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="" className="text-primary font-medium">
              Weight
            </label>
            <br />
            <input
              type="text"
              name="weight"
              defaultValue={""}
              onChange={handleOnChange}
              placeholder="Weight"
              className="p-2 w-full  outline-none border-primary border rounded-md"
            />
          </div>
          <div className="w-full">
            <label htmlFor="" className="text-primary font-medium">
              Medical History
            </label>
            <br />
            <textarea
              name="medical_history"
              defaultValue={""}
              onChange={handleOnChange}
              placeholder="Medical history"
              rows={4}
              className="p-2 w-full lg:w-full outline-none border-primary border rounded-md"
            />
          </div>
          <div className="mt-2 w-full">
            <button
              type="submit"
              className="w-full py-3 font-bold text-white bg-primary rounded-2xl hover:bg-hover"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompletePatientForm;
