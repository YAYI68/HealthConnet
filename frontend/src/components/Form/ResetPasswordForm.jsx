import { useState } from "react";
import useFormValidator from "../../hooks/useFormValidator";
import TextField from "./TextField";
import { SubmitButton } from "../UI";
import { axiosInstance } from "../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = ({ uid, token }) => {
  const { validator, dispatch } = useFormValidator();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formValue;
    dispatch({ type: "password", value: formValue.password });

    if (password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(`/reset_password/`, {
        uid,
        token,
        password: formValue.password,
      });
      toast.success(data.message);
      navigate("/login");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} action="" className="w-full lg:w-[80%]">
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
        <SubmitButton text="Submit" loading={loading} className={""} />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
