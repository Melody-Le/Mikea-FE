import Grid from "@mui/material/Unstable_Grid2";
import RegisterForm from "../../Components/Register/RegisterForm";
import LoginForm from "../../Components/Login/LoginForm";
import { Box } from "@mui/material";

function AuthGrid(props) {
  const { formType } = props;
  return (
    <Box
      className="auth-page"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Grid
        container
        spacing={4}
        columns={{ xs: 1, md: 12 }}
        justifyContent="center"
      > */}
      {formType === "register" ? <RegisterForm /> : <LoginForm />}
      {/* </Grid> */}
    </Box>
  );
}

export default AuthGrid;
