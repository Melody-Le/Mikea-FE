import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";

import axios from "../../api/axios";
import AuthContext from "../../Context/AuthProvider";
import { useCookies } from "react-cookie";

export const Login = async (email, password) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie] = useCookies();
  const { auth, setAuth } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/"; // to get where they came from

  try {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });
    const { accessToken, refreshToken } = response?.data;
    setCookie("refreshToken", refreshToken);
    setCookie("accessToken", accessToken);
    setCookie("email", email);
    setAuth({ accessToken, email });
    navigate(from, { replace: true });
    return;
  } catch (err) {
    if (!err?.response) {
      console.log("No Server Response");
    } else if (err.response?.status === 400) {
      console.log(err?.response?.data?.error);
    }
    return;
  }
};
