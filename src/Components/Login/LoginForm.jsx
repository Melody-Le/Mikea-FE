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

export default function LoginForm() {
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
      setIsLoading(false);
      setOpenSnack(true);
      setMessage("Login successful. Redirecting to homepage...");
      setSeverity("success");
      navigate(-1, { replace: true });
    } catch (err) {
      setIsLoading(false);
      setOpenSnack(true);
      setMessage(err?.response?.data?.error);
      setSeverity("error");
      return;
    }
  };
  if (auth?.email) {
    return (
      <Box className={styles["form"]}>
        <Typography
          variant="h4"
          component="h1"
          textAlign={"center"}
          className={styles["title"]}
          gutterBottom
        >
          You have logged in as&nbsp;
          <span className="highlight-text">{auth.email}</span>
        </Typography>
        <Box textAlign={"center"}>
          <Button variant="contained" route="/">
            Back to Home
          </Button>
          <Button variant="outlined" href="/user">
            Visit your Dashboard
          </Button>
        </Box>
      </Box>
    );
  }

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
            <LoadingBtn
              className="auth-btn"
              loading={isLoading}
              onClick={handleLoginSubmit}
              variant="contained"
              fullWidth={true}
              marginTop="2"
              title="Login"
            />
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
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={(event, reason) => {
            if (reason === "timeout") {
              setOpenSnack(false);
            }
          }}
        >
          <Alert severity={severity} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
