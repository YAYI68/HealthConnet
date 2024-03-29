import { useEffect, useState } from "react";
import { filteredInput } from "../../utils";
import UserImg from "../../assets/images/default.png";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import { SubmitButton } from "../UI";

const CompletePatientForm = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [imgFile, setImgFile] = useState();
  const [values, setValues] = useState({
    gender: "",
    state: "",
    country: "",
    blood_group: "",
    age: "",
    genotype: "",
    marital_status: "",
    weight: "",
    medical_history: "",
  });
  const navigate = useNavigate();
  console.log({ userId });
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
    try {
      const response = await axiosInstance.post(`/patient/register/`, newData);
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
        <div className="w-full flex flex-col lg:flex-row gap-2 lg:justify-between">
          <div className="lg:w-[45%] w-full">
            <label htmlFor="" className="text-primary font-medium">
              Gender *
            </label>
            <br />
            <select
              onChange={handleOnChange}
              defaultValue={""}
              name="gender"
              className="p-2 w-full  outline-none border-primary border rounded-md"
            >
              <option value=""></option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          <div className="lg:w-[45%] w-full">
            <label htmlFor="" className="text-primary font-medium">
              Age *
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
              Country *
            </label>
            <br />
            <select
              onChange={handleOnChange}
              name="country"
              className="p-2 w-full  outline-none border-primary border rounded-md"
            >
              <option value=""></option>
              <option value="Nigeria">Nigeria</option>
            </select>
          </div>
          <div>
            <label htmlFor="" className="text-primary font-medium">
              State *
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
          <div className="lg:w-[45%] w-full">
            <label htmlFor="" className="text-primary font-medium">
              Marital Status
            </label>
            <br />
            <select
              onChange={handleOnChange}
              name="marital_status"
              placeholder="Marital Status"
              className="p-2 w-full  outline-none border-primary border rounded-md"
            >
              <option value="SINGLE">Single</option>
              <option value="MARRIED">Married</option>
              <option value="DIVORCED">Divorced</option>
            </select>
          </div>

          <div>
            <label htmlFor="" className="text-primary font-medium">
              Genotype *
            </label>
            <br />
            <input
              required
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
              placeholder="Weight in kg"
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
            <SubmitButton text={"Submit"} loading={loading} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompletePatientForm;
