import "./App.css";
import { Route, Routes } from "react-router-dom";

import Container from "@mui/material/Container";
import Home from "./Pages/Home/Home";
import ProductsIndex from "./Pages/ProductsIndex/ProductsIndex";
import AuthGrid from "./Pages/Auth/AuthPage";
import SiteHeader from "./Components/SiteHeader/SiteHeader";
import LogOut from "./Components/Logout/Logout";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProfileEdit from "./Pages/Dashboard/ProfileEdit";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ProductShowPage from "./Pages/ProductShowPage/ProductShowPage";
import Layout from "./Components/Layout/Layout";
import CategoriesIndex from "./Pages/Categories/CategoriesIndex";
import OrderPage from "./Pages/OrderPage/OrderPage";
import RequireAuth from "./Components/RequireAuth/RequireAuth";

function App() {
  return (
    <div className="App">
      <ShoppingCartProvider>
        <SiteHeader />
        <Container mb={1}>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public Routes:  */}
              <Route path="/" element={<Home />} />
              <Route
                path="/register"
                element={<AuthGrid formType="register" />}
              />
              <Route path="/login" element={<AuthGrid formType="login" />} />
              <Route path="/categories/:slug" element={<CategoriesIndex />} />
              <Route path="/products" element={<ProductsIndex />} />
              <Route path="/products/:slug" element={<ProductShowPage />} />
              {/* Protected route  */}
              <Route element={<RequireAuth />}>
                <Route path="/order" element={<OrderPage />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/user" element={<Dashboard />} />
                <Route path="/user/edit" element={<ProfileEdit />} />
              </Route>
              {/* Catch all  */}
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </div>
  );
}

export default App;
