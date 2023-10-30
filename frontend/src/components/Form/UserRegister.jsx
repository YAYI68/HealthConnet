import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { LoginForm, SignUpForm, UserTypeInput } from "../Form";

const UserRegister = () => {
  const { pathname, state } = useLocation();
  const { accessToken } = useAuthContext();
  const navigate = useNavigate();
  const [userType, setUserType] = useState("DOCTOR");

  const authUser = !!accessToken;

  function onChangeUserType(userType) {
    setUserType(userType);
  }

  useEffect(() => {
    if (authUser) navigate(state?.pathname || "/");
  }, [authUser]);
  return (
    <>
      {pathname === "/login" ? (
        <h2 className=" font-[900] text-[1.5rem] mt-4 mb-[3rem]">Sign In</h2>
      ) : (
        <Fragment>
          <h2 className="mt-[3rem] font-[900] text-[1.5rem]">Create Account</h2>
          <UserTypeInput
            userType={userType}
            handleUserType={onChangeUserType}
          />
        </Fragment>
      )}
      {pathname == "/sign-up" ? (
        <SignUpForm userType={userType} />
      ) : (
        <LoginForm userType={userType} />
      )}
      {/* sign up with google */}

      <div className="mt-8 flex flex-col ">
        <p className="text-center mt-6 text-[.9rem] mb-4">
          {pathname === "/login"
            ? "Don't have an account?"
            : "Already have an account"}{" "}
          <Link
            to={pathname === "/login" ? "/sign-up" : "/login"}
            className="text-primary hover:underline"
          >
            {pathname === "/login" ? "Sign Up" : "Sign in"}
          </Link>
        </p>
        <p className="text-center mt-6 text-[.9rem] mb-4">
          <span className="mr-2">Forget Password Click</span>

          <Link
            to={"/forget-password"}
            className="text-primary hover:underline"
          >
            here
          </Link>
        </p>
      </div>
    </>
  );
};

export default UserRegister;
