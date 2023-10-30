import { useEffect, useRef, useState } from "react";
import { SubmitButton } from "../UI";

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
      maxLength={1}
      onChange={handleOnchange}
      onKeyDown={(e) => handleOnKeyDown(e, index)}
      value={otp[index]}
    />
  );
};

let currentOtpIndex = 0;
const TokenForm = () => {
  const [otp, setOpt] = useState([]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const handleOnchange = (e) => {
    const { value } = e.target;
    let newOtp = [];
    newOtp[currentOtpIndex] = value.substring(value.length - 1);
    setOpt(newOtp);
    if (!value) {
      setActiveOtpIndex(currentOtpIndex - 1);
    } else {
      setActiveOtpIndex(currentOtpIndex + 1);
    }
  };

  const handleOnKeyDown = (e, index) => {
    currentOtpIndex = index;
    if (e.key === "Backspace") {
      setActiveOtpIndex(currentOtpIndex - 1);
    }
  };

  useEffect(() => {
    if (otp.length >= 5) {
      console.log("send Otp");
    }
  }, [otp.length]);

  return (
    <form
      action=""
      className="w-full lg:w-[60%] flex flex-col items-center gap-4 "
    >
      <div className="w-full flex items-center gap-4">
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

      <SubmitButton text={"Apply Token"} className={""} loading={""} />
    </form>
  );
};

export default TokenForm;
