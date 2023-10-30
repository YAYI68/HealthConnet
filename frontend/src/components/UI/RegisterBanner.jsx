import ConsultantImg from "../../assets/svg/medical-consultant.svg";

const RegisterBanner = () => {
  return (
    <div className="relative lg:w-2/5 md:w-2/4 hidden md:flex px-4">
      <p className="w-full mt-8 text-[2rem] font-extrabold text-white capitalize">
        Connect with the best <br /> specialist all over the country
      </p>
      <img
        src={ConsultantImg}
        alt=""
        className="absolute bottom-0 max-w-[30rem]"
      />
    </div>
  );
};

export default RegisterBanner;
