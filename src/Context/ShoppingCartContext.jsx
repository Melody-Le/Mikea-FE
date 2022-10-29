import { createContext, useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingCart from "../Components/ShoppingCart/ShoppingCart";

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
  const [cartQty, setCartQty] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  useEffect(() => {
    if (isAuth) {
      try {
        axiosPrivate.get(`/cart`).then((response) => {
          setCartItems(response.data.lineItems);
          setCartQty(response.data.count);
        });
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      navigate("/login");
    }
  }, [auth, cartQty]);

  function getCartItemQty(id) {
    return cartItems?.find((item) => item.variantId === id)?.qty || 0;
  }

  const value = {
    cartItems,
    cartQty,
    openCart,
    closeCart,
    getCartItemQty,
  };
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
