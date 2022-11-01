import { createContext, useState, useContext, useEffect } from "react";
import ShoppingCart from "../Components/ShoppingCart/ShoppingCart";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [cartItems, setCartItems] = useState([]);
  const [totalItemInCart, setTotalItemInCart] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (isAuth) {
      async function getData() {
        try {
          const cartItemsResponse = await axiosPrivate.get(`/cart`);
          if (cartItemsResponse?.data) {
            setCartItems(cartItemsResponse.data.lineItems);
            setTotalItemInCart(cartItemsResponse.data.count);
          }
          return;
        } catch (error) {
          console.log(error);
          return;
        }
      }
      getData();
    } else {
      setCartItems([]);
      return;
    }
  }, [auth]);

  const getCartItemQty = (id) => {
    return cartItems?.find((item) => item.variantId === id)?.qty || 0;
  };
  const fetchCart = async () => {
    try {
      const cartItemsResponse = await axiosPrivate.get(`/cart`);
      if (cartItemsResponse?.data) {
        setCartItems(cartItemsResponse.data.lineItems);
        setTotalItemInCart(cartItemsResponse.data.count);
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const addToCart = async (variantId) => {
    if (isAuth) {
      try {
        await axiosPrivate.post(`/cart/add/${variantId}`);
        await fetchCart();
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      navigate("/login", { replace: true });
    }
  };
  const removeFromCart = async (variantId) => {
    try {
      await axiosPrivate.delete(`/cart/${variantId}`);
      await fetchCart();
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };
  const updateQtyLineItemQty = async (variantId, qty) => {
    try {
      await axiosPrivate.put(`/cart/${variantId}`, { updateQty: qty });
      await fetchCart();
      return;
    } catch (error) {}
  };

  const value = {
    cartItems,
    totalItemInCart,
    openCart,
    closeCart,
    getCartItemQty,
    removeFromCart,
    addToCart,
    fetchCart,
    updateQtyLineItemQty,
  };
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
