import "./App.css";
import { Route, Routes } from "react-router-dom";

import ProductCard from "./Components/ProductCard/ProductCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Home from "./Pages/Home/Home";
import ProductsIndex from "./Pages/ProductsIndex/ProductsIndex";
import AuthGrid from "./Pages/Auth/AuthPage";
import SiteHeader from "./Components/SiteHeader/SiteHeader";
import User from "./Components/User";
import LogOut from "./Components/Logout/Logout";

function App() {
  return (
    <div className="App">
      <SiteHeader />
      <Container mb={1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<AuthGrid formType="register" />} />
          <Route path="/login" element={<AuthGrid formType="login" />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/products" element={<ProductsIndex />} />
          <Route path="/user" element={<Home />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p style={{ color: "var(--color1)" }}>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
