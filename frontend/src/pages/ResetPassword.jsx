import { Link, useLocation, useNavigate } from "react-router-dom";
import { RegisterBanner } from "../components/UI";
import { ResetPasswordForm } from "../components/Form";
import { useEffect } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!uid || !token) {
      navigate("/forget-password");
    }
  }, [uid, token]);

  return (
    <div className="md:bg-primary flex w-[80%] md:w-[100%]  min-h-[100vh] mx-auto relative ">
      <RegisterBanner />
      <div className="bg-white w-full md:w-2/4 lg:w-3/5 md:p-[1rem_4rem] relative rounded-[2rem]">
        <div className="flex flex-col gap-4">
          <h2 className=" font-[900] text-[1.5rem] mt-4 mb-[3rem]">
            Password Reset
          </h2>
          <p className="text-center text-[1.2rem] font-semibold">
            Kindly Reset your password
          </p>
        </div>
        <div className="w-full mt-[2rem] flex flex-col  items-center">
          <ResetPasswordForm uid={uid} token={token} />
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

export default ResetPassword;
