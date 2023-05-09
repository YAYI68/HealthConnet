import React, { useMemo } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

function GoogleLogin({ pathname }) {
  const socialLinks = useMemo(() => {
    return [
      { id: 1, icon: <FcGoogle size={24} /> },
      { id: 2, icon: <ImFacebook size={24} /> },
      { id: 3, icon: <BsInstagram size={24} /> },
      { id: 4, icon: <BsTwitter size={24} color="lightblue" /> },
    ];
  }, []);

  const handleSocialLogin = ({ target }) => {
    const id = target.parentElement.parentElement.id;
    // use the id to target the element
  };

  return (
    <div>
      <div className="flex items-center relative gap-2">
        <span className="inline-block h-[.5px] w-2/6 bg-gray-500 flex-1"></span>
        <span className="inline-block m-h-[10px] w-[fit_content] text-center">
          Or Sign {pathname=== "/login"? "in": "up"} With
        </span>{" "}
        <span className="inline-block h-[.5px] w-2/6 bg-gray-500 flex-1"></span>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {socialLinks?.map((item) => {
          return (
            <button
              key={item.id}
              id={item.id}
              className="flex items-center justify-center rounded-full p-2 border border-solid"
              onClick={handleSocialLogin}
            >
              {item.icon}
            </button>
          );
        })}
      </div>
      <p className="text-center mt-6 text-[.9rem] mb-4">
        {pathname === "/login" ? "Don't have an account?" : "Already have an account"}{" "}
        <Link to={pathname === "/login"? "/sign-up": "/login"} className="text-primary hover:underline">{pathname === "/login"? "Sign Up": "Sign in"}</Link>
      </p>
    </div>
  );
}
export default React.memo(GoogleLogin);
