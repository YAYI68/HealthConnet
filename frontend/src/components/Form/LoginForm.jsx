import React, { useEffect, useState } from "react";
import { TextField } from "../Form";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axios";
import { useAuthContext } from "../../context/AuthContext";
import useUser from "../../hooks/useUser";
import { useAppContext } from "../../context/AppContext";

function LoginForm({ userType }) {
  const { setAccessToken, setCSRFToken, setUser, verifyToken } =
    useAuthContext();
  const { upDateModal, setUpdateModal, setModalMessage } = useAppContext();
  const getUser = useUser();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (verifyToken) {
      navigate("/verify");
    }
  }, [verifyToken]);

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
    agree: false,
  });
  console.log({ verifyToken });
  const onChange = ({ target }) => {
    const { name, value, checked } = target;

    if (name !== "agree") {
      setLoginValues({
        ...loginValues,
        [name]: value,
      });
    } else {
      setLoginValues({
        ...loginValues,
        [name]: checked,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginValues;
    const user = { email, password };
    try {
      const response = await axiosInstance.post(`/login/`, user);
      if (response.data) {
        setAccessToken(response?.data?.access_token);
        setCSRFToken(response.headers["x-csrftoken"]);
        setUser(response.data?.user);
        const currentUser = response.data.user;
        setModalMessage(
          "Please complete your profile Information for good user experince."
        );
        setUpdateModal(!currentUser.isProfileComplete);
        navigate("/dashboard/overview");
        toast.success("User successfully Login ");
      }
    } catch (error) {
      console.log({ error });
      toast.error("Invalid Email/Password!");
    }
  };
  return (
    <div className="">
      <form action="" className="w-full p-4" onSubmit={handleSubmit}>
        <div className="mt-[1rem]">
          <TextField
            placeholder="Email"
            name="email"
            value={loginValues.email}
            onChange={onChange}
          />
        </div>
        <div className="mt-[1rem]">
          <TextField
            placeholder="Password"
            type="password"
            name="password"
            value={loginValues.password}
            onChange={onChange}
          />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-primary rounded-2xl hover:bg-hover"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
export default React.memo(LoginForm);
