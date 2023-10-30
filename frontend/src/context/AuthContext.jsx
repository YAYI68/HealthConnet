import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const otp = localStorage.getItem("_otp");
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [csrftoken, setCSRFToken] = useState("");
  const [isloading, setIsLoading] = useState(true);
  const [verifyToken, setVerifyToken] = useState(otp || false);

  const handleVerifyToken = (state) => {
    localStorage.setItem("_otp", state);
    setVerifyToken(state);
  };

  const value = {
    user,
    setUser,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    csrftoken,
    setCSRFToken,
    verifyToken,
    handleVerifyToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context == undefined) {
    throw new Error("useAuthContext must be within a App provider");
  }
  return context;
}
