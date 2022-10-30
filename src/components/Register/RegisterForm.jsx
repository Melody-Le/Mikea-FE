import { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Button, Divider } from "@mui/material";

import styles from "../Login/LoginGrid.scss";
import axios from "../../api/axios";
import AuthContext from "../../Context/AuthProvider";
import { Login } from "../Login/Login";

function RegisterForm() {
  const formObj = {
    emailRef: useRef(),
    usernameRef: useRef(),
    passwordRef: useRef(),
    confirmPasswordRef: useRef(),
  };
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const { auth } = useContext(AuthContext);
  const registerSubmit = (event) => {
    event.preventDefault();
    const email = formObj.emailRef.current.value;
    const username = formObj.usernameRef.current.value;
    const password = formObj.passwordRef.current.value;
    const confirmPassword = formObj.confirmPasswordRef.current.value;
    if (password !== confirmPassword) {
      setOpen(true);
      setMessage("Your password and Confirmed password not match.");
      setSeverity("error");
      return;
    }
    axios
      .post("/auth/register", {
        username,
        email,
        password,
      })
      .then((response) => {
        setOpen(true);
        setMessage("Success");
        setSeverity("success");
        return;
      })
      .catch((error) => {
        setOpen(true);
        setMessage(error.response.data.error);
        setSeverity("error");
        return;
      });
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
        variant="subtitle1"
        textAlign={"center"}
        className={styles["title"]}
        gutterBottom
      >
        Sign up by
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
        <form id="registration-form">
          <Typography variant="subtitle1" gutterBottom>
            Username
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            placeholder="Ex. McSpicy"
            variant="filled"
            size="small"
            form="registration-form"
            sx={{ marginBottom: 2 }}
            className={styles["input-text"]}
            inputRef={formObj.usernameRef}
          />
          <Typography variant="subtitle1" gutterBottom>
            Email
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            id="email"
            placeholder="Ex. mcspicy@email.com"
            variant="filled"
            size="small"
            sx={{ marginBottom: 2 }}
            className={styles["input-text"]}
            inputRef={formObj.emailRef}
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
          <Typography variant="subtitle1" gutterBottom>
            Confirm Password
          </Typography>
          <TextField
            required
            hiddenLabel
            fullWidth
            id="confirm-password"
            type="password"
            variant="filled"
            size="small"
            sx={{ marginBottom: 2 }}
            className={styles["input-text"]}
            inputRef={formObj.confirmPasswordRef}
          />
          <Box textAlign={"center"}>
            <Button
              onClick={registerSubmit}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "var(--color4)",
                marginTop: 2,
                ":hover": {
                  bgcolor: "var(--color4a)",
                },
              }}
            >
              Sign up
            </Button>
          </Box>
          <Box textAlign={"center"} mt={2} mb={2}>
            <Typography
              variant="subtitle1"
              align={"center"}
              display={"inline"}
              paddingX={1}
              gutterBottom
            >
              Already have an account?
            </Typography>
            <Link className={styles["link"]} to="/login">
              <Typography>Log in here</Typography>
            </Link>
          </Box>
        </form>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason === "timeout") {
            setOpen(false);
          }
        }}
      >
        <Alert variant="filled" severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RegisterForm;
