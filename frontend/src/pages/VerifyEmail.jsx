import { useEffect } from "react";
import { TokenForm } from "../components/Form";
import { RegisterBanner } from "../components/UI";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { verifyToken, setVerifyToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!verifyToken) {
      navigate("/login");
    }
  }, [verifyToken]);
  return (
    <div className="md:bg-primary flex w-[80%] md:w-[100%]  min-h-[100vh] mx-auto relative ">
      <RegisterBanner />

      <div className="bg-white w-full md:w-2/4 lg:w-3/5 md:p-[1rem_4rem] relative rounded-[2rem]">
        <div className="flex flex-col gap-4">
          <h2 className=" font-[900] text-[1.5rem] mt-4 mb-[3rem]">
            Verify Email
          </h2>
          <p className="text-center lg:text-[1.3rem]">
            Enter the code that was sent to your email
          </p>
        </div>
        <div className="w-full mt-[2rem] flex flex-col  items-center">
          <TokenForm />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
