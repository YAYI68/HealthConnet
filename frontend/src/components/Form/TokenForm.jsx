import { useEffect, useRef, useState } from "react";
import { SubmitButton } from "../UI";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axios";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TokenInput = ({
  otp,
  index,
  activeOtpIndex,
  handleOnchange,
  handleOnKeyDown,
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);
  return (
    <input
      ref={index === activeOtpIndex ? inputRef : null}
      type="text"
      className="w-[2rem] h-[2rem] lg:h-[5rem] lg:w-[5rem] text-base lg:text-[2rem] border-2 rounded-md focus:outline-none border-primary text-center flex"
      // maxLength={1}
      onChange={handleOnchange}
      onKeyDown={(e) => handleOnKeyDown(e, index)}
      value={otp[index]}
    />
  );
};

let currentOtpIndex = 0;
const TokenForm = () => {
  const { verifyToken, handleVerifyToken } = useAuthContext();
  const [otp, setOpt] = useState([]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const navigate = useNavigate();

  const handleOnchange = (e) => {
    const { value } = e.target;
    let newOtp = [...otp];
    newOtp[currentOtpIndex] = value.substring(value.length - 1);
    setOpt(newOtp);
    if (!value) {
      setActiveOtpIndex(currentOtpIndex - 1);
    } else {
      setActiveOtpIndex(currentOtpIndex + 1);
    }
  };

  console.log({ verifyToken });

  useEffect(() => {
    if (!verifyToken) {
      navigate("/login");
    }
  }, [verifyToken]);
  console.log({ verifyToken });
  const handleOnKeyDown = (e, index) => {
    currentOtpIndex = index;
    if (e.key === "Backspace") {
      setActiveOtpIndex(currentOtpIndex - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length < 5 || otp.length > 5) {
      toast.error("Kindly Provide a vaild OTP sent to your email.");
    }

    const otpData = otp.join("");
    console.log({ otpData });
    try {
      const { data } = await axiosInstance.post(`/confirm/account/`, {
        token: otpData,
      });
      toast.success(data.message);
      handleVerifyToken(false);
      navigate("/complete/profile", {
        state: { userId: data.userId, role: data.role, name: data.name },
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      action=""
      className="w-full lg:w-[60%] flex flex-col items-center gap-4 "
    >
      <div className="w-full flex justify-center items-center gap-4">
        {Array.from({ length: 5 }, (_, index) => (
          <TokenInput
            key={index}
            index={index}
            otp={otp}
            activeOtpIndex={activeOtpIndex}
            handleOnchange={handleOnchange}
            handleOnKeyDown={handleOnKeyDown}
          />
        ))}
      </div>
      <SubmitButton
        text={"Apply OTP"}
        className={""}
        loading={""}
        disabled={otp.length < 5}
      />
    </form>
  );
};

export default TokenForm;
