import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./Context/AuthProvider";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ShoppingCartProvider>
          <App />
        </ShoppingCartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
