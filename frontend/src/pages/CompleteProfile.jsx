import { CompleteDoctorForm } from "../components/Form";
import { RegisterBanner } from "../components/UI";

const CompleteProfile = () => {
  return (
    <div className="md:bg-primary flex w-[80%] md:w-[100%]  min-h-[100vh] mx-auto relative ">
      <RegisterBanner />

      <div className="bg-white w-full md:w-2/4 lg:w-3/5 md:p-[1rem_4rem] relative rounded-[2rem]">
        <div className="flex flex-col gap-4">
          <h2 className=" font-[900] text-[1.5rem] mt-4 mb-[3rem]">
            Complete Profile
          </h2>
          <p>Enter the code that was sent to your email</p>
        </div>
        <div className="w-full mt-[2rem] flex flex-col  items-center">
          {/* <CompletePatientForm /> */}
          <CompleteDoctorForm />
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
