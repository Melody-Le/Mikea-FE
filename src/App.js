import "./App.css";
import { Route, Routes } from "react-router-dom";

import ProductCard from "./Components/ProductCard/ProductCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Home from "./Pages/Home/Home";
import ProductsIndex from "./Pages/ProductsIndex/ProductsIndex";
import AuthGrid from "./Pages/Auth/AuthPage";
import SiteHeader from "./Components/SiteHeader/SiteHeader";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LogOut from "./Components/Logout/Logout";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProfileEdit from "./Pages/Dashboard/ProfileEdit";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import CheckboxTest from "./Components/ShoppingCart/Checkbox";
const theme = createTheme({});

function App() {
  return (
    <div className="App">
      {/* <ThemeProvider theme={theme}> */}
      <ShoppingCartProvider>
        <SiteHeader />
        <Container mb={1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={<AuthGrid formType="register" />}
            />
            <Route path="/login" element={<AuthGrid formType="login" />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/products" element={<ProductsIndex />} />
            <Route path="/checkbox" element={<CheckboxTest />} />
            <Route path="/user" element={<Dashboard />} />
            <Route path="/user/edit" element={<ProfileEdit />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
