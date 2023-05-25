import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import React, {createContext,useContext, useEffect, useState} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";

  

const AuthContext = createContext()
  
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    const [csrftoken, setCSRFToken] = useState('')
    const [isloading,setIsLoading] =  useState(true)
     
    const value = {
      user, setUser,
      accessToken, setAccessToken,
      refreshToken, setRefreshToken,
      csrftoken, setCSRFToken
    }

    return <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
  }
  
  export function useAuthContext() {
    const context = useContext(AuthContext)
    if (context == undefined) {
      throw new Error('useAuthContext must be within a App provider')
    }
    return context
  }