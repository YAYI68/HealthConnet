import { HiArrowLeft } from "react-icons/hi";
import { useFlutterwave } from "flutterwave-react-v3";
import { useAuthContext } from "../../context/AuthContext";
import { FLUTTERWARE_PUBLIC_KEY } from "../../utils/constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import usePostData from "../../hooks/usePostData";
import usePeriod from "../../store/usePeriod";

const summaryPosition = 1;
const KEY = "new_appointment";
const URL = "appointment";
const AppointSummary = ({ step, setStep, doctor }) => {
  const { data, isLoading, mutate, postData } = usePostData(KEY, URL);
  const { appointTime, appointDate } = usePeriod();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const position = summaryPosition - step;

  const config = {
    public_key: FLUTTERWARE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: doctor.price,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user.email,
    },
    customizations: {
      title: "Appointment",
      description: `Payment for ${doctor.field}`,
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  const makeAppointment = async () => {
    const inputData = {
      time: appointTime,
      date: appointDate,
      name: "hello",
      doctor_id: doctor.uid,
    };
    mutate();
    await postData(inputData);
    setStep((prev) => prev + 1);
  };

  const payOnline = async () => {
    handleFlutterPayment({
      callback: async (response) => {
        makeAppointment();
        toast.success(
          "Payment is made successfully with Cash. Thanks for using anywash"
        );
        navigate(`/appointment/${doctor.slug}`);
      },
      onClose: () => {
        toast.error("Your appointment was cancelled");
        navigate(`/appointment/${doctor.slug}`);
      },
    });
  };

  return (
    <div
      style={{
        transform: `translateX(${position * 100}%)`,
        transition: "transform",
      }}
      className={`w-full h-full rounded-md px-2 py-4 absolute bg-secondary  transition-[transform]`}
    >
      <button
        onClick={() => setStep((prev) => prev - 1)}
        type="button"
        className="h-[2rem] w-[2rem] flex items-center justify-center rounded-[50%] bg-secondary"
      >
        <HiArrowLeft className="h-[80%] w-[80%] text-primary" />
      </button>
      <h3 className="text-primary lg:text-[1.5rem] font-semibold text-center">
        Appointment Summary
      </h3>
      <div className="w-full flex text-[.7rem] md:text-[1rem]  items-center justify-center">
        <div className="w-[90%]">
          <div className=" w-full flex items-center justify-between p-2 border-b-2 border-b-black">
            <p>Medical Center</p>
            <p className="text-primary">{doctor.hospital}</p>
          </div>
          <div className=" w-full flex items-center justify-between p-2 border-b-2 border-b-black">
            <p>Medical Location</p>
            <p className="text-primary">{doctor.location}</p>
          </div>
          <div className=" w-full flex items-center justify-between p-2 border-b-2 border-b-black">
            <p>Specialist</p>
            <p className="text-primary">
              Dr, {doctor.firstname} {doctor.lastname}
            </p>
          </div>

          <div className=" w-full flex items-center justify-between p-2 border-b-2 border-b-black">
            <p>Date and Time</p>
            <p className="text-primary">
              {new Date(appointDate).toDateString()} at {appointTime}
            </p>
          </div>

          <div className=" w-full flex items-center justify-between p-2 border-b-2 border-b-black">
            <p>Patient</p>
            <p className="text-primary">
              {user.firstname} {user.lastname}
            </p>
          </div>
          <div className=" w-full flex items-center justify-between p-2 border-b-2 border-b-black">
            <p>Appointment Fee</p>
            <p className="text-primary">&#8358;{doctor.price}</p>
          </div>
        </div>
      </div>
      <button
        onClick={payOnline}
        type=""
        className="absolute bottom-0 left-0 w-full p-2 text-center rounded-md bg-primary text-white "
      >
        Pay For Appointment
      </button>
    </div>
  );
};

export default AppointSummary;
