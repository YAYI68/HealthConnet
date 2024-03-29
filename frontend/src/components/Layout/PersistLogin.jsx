import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useAuthContext } from "../../context/AuthContext";
// import useAuth from '../hooks/useAuth'
// import useAxiosPrivate from '../hooks/useAxiosPrivate'
// import useRefreshToken from '../hooks/useRefreshToken'

export default function PersistLogin() {
  const refresh = useRefreshToken();
  const { accessToken, setUser, user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;

    async function verifyUser() {
      try {
        // await refresh();
        const { data } = await axiosPrivate.get("/user/");
        setLoading(false);
        setUser(data);
      } catch (error) {
        setLoading(false);
      } finally {
        isMounted && setLoading(false);
      }
    }

    !accessToken ? verifyUser() : setLoading(false);

    return () => {
      isMounted = false;
    };
  }, [accessToken]);

  return loading ? <h1>Loading</h1> : <Outlet />;
}
