import { createContext, useState, useContext, useEffect } from "react";
import ShoppingCart from "../Components/ShoppingCart/ShoppingCart";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import AuthContext from "./AuthProvider";

const OrderedItemsContext = createContext({});

export function useOrderedItemsContext() {
  return useContext(OrderedItemsContext);
}

export function OrderedItemsProvider({ children }) {
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axiosPrivate.get("/orders");
        setOrders(response.data.orderList);
        setIsLoading(false);
      } catch (err) {}
    }

    getData();
    return;
  }, []);

  const value = {
    orders,
    isLoading,
    setIsLoading,
  };
  return (
    <OrderedItemsContext.Provider value={value}>
      {children}
    </OrderedItemsContext.Provider>
  );
}
