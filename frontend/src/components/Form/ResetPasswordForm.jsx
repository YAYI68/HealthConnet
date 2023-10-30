import { useState } from "react";
import useFormValidator from "../../hooks/useFormValidator";
import TextField from "./TextField";
import { SubmitButton } from "../UI";

const ResetPasswordForm = () => {
  const { validator, dispatch } = useFormValidator();

  const [formValue, setFormValue] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleOnchange = (e) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = ({ target }) => {
    const { type, value, name } = target;
    if (!value) {
      dispatch({ type: name, value });
    }
  };

  const handleSubmit = () => {};
  return (
    <form action="" className="w-full lg:w-[80%]">
      <div className="w-full">
        <label htmlFor="" className="text-primary">
          New Password
        </label>
        <TextField
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleOnchange}
          error={validator.password}
          onBlur={handleBlur}
        />
      </div>
      <div className="my-4">
        <label htmlFor="" className="text-primary">
          Confirm Password
        </label>
        <br />
        <TextField
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={handleOnchange}
          error={validator.password}
          onBlur={handleBlur}
        />
      </div>
      <div className="mt-2 w-full">
        <SubmitButton text="Submit" loading={true} className={""} />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
