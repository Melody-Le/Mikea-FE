import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [cookies] = useCookies();

  const [auth, setAuth] = useState({
    username: cookies.username || "",
    accessToken: cookies.accessToken || "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
