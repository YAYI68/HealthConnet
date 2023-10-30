import { useEffect, useState } from "react";
import { filteredInput } from "../../utils";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserImg from "../../assets/images/default.png";
import { FaPen } from "react-icons/fa";
import { SubmitButton } from "../UI";

const CompleteDoctorForm = () => {
  const axiosPrivate = useAxiosPrivate();

  const [preview, setPreview] = useState();
  const [imgFile, setImgFile] = useState();
  const [values, setValues] = useState({
    bio: "",
    gender: "",
    experience: "",
    field: "",
    hospital: "",
    location: "",
    phonenumber: "",
    state: "",
    country: "",
    qualification: "",
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

  const handleSubmit = async () => {
    const inputData = { ...values, image: imgFile };
    const newData = filteredInput(inputData);
    console.log({ newData });
    //   const response = await axiosPrivate.patch(`/doctor/`, newData);
    //   if (response.status === 200) {
    //     mutate();
    //     toast.success("Profile successfully updated ");
    //     navigate("/dashboard/profile");
    //   }
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
                Qualification
              </label>
              <br />
              <input
                type="text"
                defaultValue={""}
                onChange={handleOnChange}
                name="qualification"
                placeholder="Qualification"
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
                placeholder="Specialization"
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
            <SubmitButton text={"Submit"} className={""} loading={""} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompleteDoctorForm;
