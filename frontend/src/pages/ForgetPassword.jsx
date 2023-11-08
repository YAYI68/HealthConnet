import { Link } from "react-router-dom";
import { TextField } from "../components/Form";
import { RegisterBanner, SubmitButton } from "../components/UI";
import { useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log({ email });
    try {
      const { data } = await axiosInstance.post(`/forget_password/`, {
        email,
      });
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="md:bg-primary flex w-[80%] md:w-[100%]  min-h-[100vh] mx-auto relative ">
      <RegisterBanner />
      <div className="bg-white w-full md:w-2/4 lg:w-3/5 md:p-[1rem_4rem] relative rounded-[2rem]">
        <div className="flex flex-col gap-4">
          <h2 className=" font-[900] text-[1.5rem] mt-4 mb-[3rem]">
            Forget Password
          </h2>
          <p className="text-center font-semibold lg:text-[1.2rem]">
            Kindly Enter your register email.
          </p>
        </div>
        <div className="w-full mt-[2rem] flex flex-col  items-center">
          <form
            onSubmit={handleOnSubmit}
            action=""
            className="w-full lg:w-[80%]"
          >
            <TextField
              placeholder="Email"
              name="email"
              onChange={handleOnChange}
            />
            <div className="mt-2 w-full">
              <SubmitButton className={""} text={"Submit"} loading={loading} />
            </div>
          </form>
          <div className="mt-8">
            <p className="text-center mt-6 text-[.9rem] mb-4">
              <span className="mr-2">Already have an account</span>
              <Link to={"/login"} className="text-primary hover:underline">
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
