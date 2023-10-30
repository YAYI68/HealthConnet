import { RegisterBanner } from "../components/UI";
import UserRegister from "../components/Form/UserRegister";

export default function Register() {
  return (
    <div className="md:bg-primary flex w-[80%] md:w-[100%]  min-h-[100vh] mx-auto relative ">
      <RegisterBanner />

      <div className="bg-white w-full md:w-2/4 lg:w-3/5 md:p-[1rem_4rem] relative rounded-[2rem]">
        <UserRegister />
      </div>
    </div>
  );
}
