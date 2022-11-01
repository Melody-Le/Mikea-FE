import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import AuthContext from "../../Context/AuthProvider";
import axios from "../../api/axios";

export default function LogOut() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const refreshToken = cookies.refreshToken;
  const { setAuth } = useContext(AuthContext);
  console.log("Logout done");
  useEffect(() => {
    removeCookie("refreshToken");
    removeCookie("accessToken");
    removeCookie("email");
    setAuth({ email: "", accessToken: "" });

    async function completeLogout() {
      await axios.delete("/auth/logout", { data: { refreshToken } });
    }

    completeLogout();
    console.log("Logout done");

    navigate("/", { replace: true });
  }, []);

  return <></>;
}
