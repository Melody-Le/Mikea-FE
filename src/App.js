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
import BreadcrumbsCustom from "./Components/BreadcrumbsCustom/BreadcrumbsCustom";
import OrderPage from "./Pages/OrderPage/OrderPage";
function App() {
  return (
    <div className="App">
      <ShoppingCartProvider>
        <SiteHeader />
        <Container mb={1}>
          <Routes>
            <Route path="/order" element={<OrderPage />} />
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/register"
                element={<AuthGrid formType="register" />}
              />
              <Route path="/login" element={<AuthGrid formType="login" />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="/breadcrumbs" element={<BreadcrumbsCustom />} />
              <Route path="/categories/:slug" element={<CategoriesIndex />} />
              <Route path="/products" element={<ProductsIndex />} />
              <Route path="/products/:slug" element={<ProductShowPage />} />
              <Route path="/user" element={<Dashboard />} />
              <Route path="/user/edit" element={<ProfileEdit />} />

              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </div>
  );
}

export default App;
