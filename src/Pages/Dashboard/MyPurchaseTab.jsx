import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import OrderCard from "../../Components/OrderCard/OrderCard";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { Stack } from "@mui/material";

function MyPurchaseTab() {
  const axiosPrivate = useAxiosPrivate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get("/orders");
        setOrders(response.data.orderList);
        setIsLoading(false);
      } catch (err) {}
    }
    getData();
  }, []);

  let ordersToShow = [];
  if (orders?.length) {
    ordersToShow = orders?.map((order, idx) => {
      const orderDetail = {
        status: order?.status,
        createdAt: order?.createdAt,
        updatedAt: order?.updatedAt,
        orderItems: order?.orderItems,
      };
      return (
        <OrderCard
          key={idx}
          orderDetail={orderDetail}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      );
    });
  }
  return (
    <Stack
      alignItems={"center"}
      sx={{
        width: "100%",
      }}
    >
      {ordersToShow}
    </Stack>
  );
}

export default MyPurchaseTab;
