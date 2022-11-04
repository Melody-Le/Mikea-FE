import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import useAuth from "../../Hooks/useAuth";
import AuthContext from "../../Context/AuthProvider";

const RequireAuth = () => {
  const { auth } = useContext(AuthContext);
  const isAuth = !!auth?.email;
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};
export default RequireAuth;
