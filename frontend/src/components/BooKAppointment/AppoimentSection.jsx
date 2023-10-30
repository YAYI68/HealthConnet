import { FaTimes } from "react-icons/fa";
import AppointmentSchedule from "./AppointmentSchedule";
import AppointSummary from "./AppointSummary";
import AppointmentSuccess from "./AppointmentSuccess";

function AppoimentSection({ step, setStep, closeToggle, doctor }) {
  return (
    <div className="h-[32rem] md:h-[33rem] w-full bg-secondary rounded-md relative border-primary border-2">
      <button
        onClick={() => closeToggle()}
        type=""
        className="h-[2rem] z-[5] w-[2rem] bg-secondary shadow-md rounded-[50%] flex items-center justify-center absolute top-0 right-0 -translate-y-1/2"
      >
        <FaTimes className="h-[80%] w-[80%] fill-primary" />
      </button>
      <div className="h-full w-full bg-secondary rounded-md relative overflow-x-hidden">
        {step === 0 ? (
          <AppointmentSchedule doctor={doctor} step={step} setStep={setStep} />
        ) : step === 1 ? (
          <AppointSummary doctor={doctor} step={step} setStep={setStep} />
        ) : (
          <AppointmentSuccess doctor={doctor} step={step} setStep={setStep} />
        )}
      </div>
    </div>
  );
}

export default AppoimentSection;
