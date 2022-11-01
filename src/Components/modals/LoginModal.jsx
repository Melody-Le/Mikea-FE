import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./Modal.scss";

import "./Modal.scss";

import AuthContext from "../../context/AuthProvider";
import Button from "../buttons/Button";
import axios from "../../api/axios";

export default function LoginModal(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuth } = useContext(AuthContext);
  const formObj = {
    usernameRef: useRef(),
    passwordRef: useRef(),
  };
  const [cookies, setCookie] = useCookies();
  if (!props.isOpen) return null;
  const { onClose } = props;

  const title = "Log in join the community";
  const text =
    "Connect with like-minded builders in our community and make your ideas come true!";

  const loginSubmit = async (evnt) => {
    evnt.preventDefault();
    const username = formObj.usernameRef.current.value;
    const hash = formObj.passwordRef.current.value;

    try {
      const response = await axios.post("/auth/login", { username, hash });
      const { accessToken, refreshToken } = response.data;

      setCookie("refreshToken", refreshToken);
      setCookie("accessToken", accessToken);
      setCookie("username", username);

      setAuth({ accessToken, username });

      onClose();
    } catch (err) {
      setErrorMessage(err?.response?.data?.error);
      return;
    }
  };

  return (
    <>
      <div className={"overlay"} onClick={onClose}></div>
      <div className={"modal"}>
        <Box className={"modal-content"}>
          <Typography variant={"h6"} className={"modal-title"}>
            {title}
          </Typography>

          <Typography variant={"body2"} className={"modal-text"}>
            {text}
          </Typography>

          <Typography variant={"caption"} className={"modal-error"}>
            {errorMessage}
          </Typography>
        </Box>

        <Grid
          container
          direction="row"
          justifyContent={"center"}
          paddingTop={2}
        >
          <Grid item>
            <Typography variant={"body2"}>Log in with</Typography>
            <GitHubIcon sx={{ marginY: 1 }} fontSize={"large"} />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" className={"or"} gutterBottom>
          <span>or</span>
        </Typography>

        <Box>
          <form>
            <Typography variant="subtitle1" gutterBottom>
              Username
            </Typography>
            <TextField
              required
              hiddenLabel
              fullWidth
              variant="filled"
              size="small"
              form="login-form"
              sx={{ marginBottom: 2 }}
              type="text"
              className={"input-text"}
              inputRef={formObj.usernameRef}
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
              className={"input-text"}
              inputRef={formObj.passwordRef}
            />
          </form>
        </Box>

        <Box padding={2}>
          <Button
            onClick={loginSubmit}
            title="Log in"
            variant="contained"
            category="action"
          />
          <Button
            onClick={onClose}
            title="Cancel"
            variant="outlined"
            category="action"
          />
        </Box>

        <Box>
          <Typography
            className={"modal-footnote"}
            variant="caption"
            align={"center"}
            display={"inline"}
            paddingX={1}
            gutterBottom
          >
            Don't have an account?&nbsp;
            <Link className={"link"} to="/register">
              Sign up
            </Link>
          </Typography>
        </Box>
      </div>
    </>
  );
}
