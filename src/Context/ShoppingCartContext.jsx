import { createContext, useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import AuthContext from "./AuthProvider";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const isAuth = !!auth?.email;
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (isAuth) {
      try {
        axiosPrivate.get(`/cart`).then((response) => {
          setCartItems(response.data);
          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      navigate("/login");
    }
  }, [auth]);
  const value = {
    cartItems,
  };

  function getCartItemQty(id) {
    // return cartItems?.find((item) => item.variantId === id)?.qty || 0;
    return id;
  }
  // const test = getCartItemQty(1);
  // console.log("test is:", test);
  return (
    <ShoppingCartContext.Provider value={{ getqty: getCartItemQty }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
