import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import styles from "./LoginGrid.scss";
import axios from "../../api/axios";
import AuthContext from "../../Context/AuthProvider";
import { Button, Divider } from "@mui/material";
// import Button from "@mui/joy/Button";
import { useCookies } from "react-cookie";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie] = useCookies();
  const { auth, setAuth } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/"; // to get where they came from
  const userRef = useRef();

  // set focus in the first input
  const formObj = {
    emailRef: useRef(),
    passwordRef: useRef(),
  };
  const loginSubmit = async () => {
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

      // navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        console.log("No Server Response");
      } else if (err.response?.status === 400) {
        console.log(err?.response?.data?.error);
      }
      return;
    }
  };

  return (
    <Box className={styles["form"]}>
      <Typography
        variant="h6"
        component="h1"
        textAlign={"center"}
        className={styles["title"]}
        gutterBottom
      >
        Log in by
      </Typography>
      <Grid container direction="row" justifyContent={"center"}>
        <Grid item>
          <GitHubIcon sx={{ marginY: 1 }} fontSize={"large"} />
        </Grid>
      </Grid>
      <Box textAlign={"center"} mt={2} mb={2}>
        Or
        <Divider sx={{ marginLeft: "5%", marginRight: "5%", marginY: 3 }} />
      </Box>

      <Box
        sx={{
          boxShadow: 7,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--color4-transparent)",
        }}
      >
        <form>
          <Typography variant="subtitle1" gutterBottom>
            Email
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            type="email"
            variant="filled"
            size="small"
            form="login-form"
            sx={{ marginBottom: 2 }}
            className={styles["input-text"]}
            inputRef={formObj.emailRef}
            ref={userRef}
          />
          <Typography variant="subtitle1" gutterBottom>
            Password
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            id="password"
            type="password"
            variant="filled"
            size="small"
            sx={{ marginBottom: 2 }}
            className={styles["input-text"]}
            inputRef={formObj.passwordRef}
          />
          <Box textAlign={"center"}>
            {/* <Button
              variant="contained"
              title="Log in"
              category="action"
              isFullWidth={true}
              onClick={loginSubmit}
            /> */}
            <Button
              onClick={loginSubmit}
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "var(--color4)", marginTop: 2 }}
            >
              Login
            </Button>
          </Box>
        </form>
        <Box textAlign={"center"} mt={2} mb={2}>
          <Typography
            variant="subtitle1"
            align={"center"}
            display={"inline"}
            paddingX={1}
            gutterBottom
          >
            Don't have an account?
          </Typography>

          <Link className={styles["link"]} to="/register">
            <Typography>Sign up</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
