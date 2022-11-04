import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingBtn from "../Button/LoadingBtn";

import styles from "./LoginGrid.scss";
import axios from "../../api/axios";
import AuthContext from "../../Context/AuthProvider";
import { Button, Divider } from "@mui/material";
import { useCookies } from "react-cookie";

export default function LoginAuto() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const { auth, setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const formObj = {
    emailRef: useRef(),
    passwordRef: useRef(),
  };
  const handleLoginSubmit = async () => {
    const email = formObj.emailRef.current.value;
    const password = formObj.passwordRef.current.value;
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
      navigate("/", { replace: true });
    } catch (err) {
      return;
    }
  };
  return <></>;
}
