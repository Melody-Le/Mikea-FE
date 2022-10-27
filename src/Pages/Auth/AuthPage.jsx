import Grid from "@mui/material/Unstable_Grid2";
import RegisterForm from "../../Components/Register/RegisterForm";
import LoginForm from "../../Components/Login/LoginForm";

function AuthGrid(props) {
  const { formType } = props;
  return (
    <Grid
      container
      spacing={4}
      columns={{ xs: 1, md: 12 }}
      justifyContent="center"
      marginTop={4}
    >
      <Grid item md={5}>
        {formType === "register" ? <RegisterForm /> : <LoginForm />}
      </Grid>
    </Grid>
  );
}

export default AuthGrid;
