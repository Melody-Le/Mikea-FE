import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { Stack, Box } from "@mui/material";

import OrderCard from "../../Components/OrderCard/OrderCard";
import OrderCardSkeleton from "../../Components/OrderCard/OrderCardSkeleton";
import EmptyBox from "../../Components/EmptyBox/EmptyBox";
function MyPurchaseTab() {
  const axiosPrivate = useAxiosPrivate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axiosPrivate.get("/orders");
        setOrders(response?.data?.orderList);
        setIsLoading(false);
      } catch (err) {}
    }

    getData();
    return;
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
        <OrderCard key={idx} orderDetail={orderDetail} isLoading={false} />
      );
    });
  } else if (!orders?.length && isLoading) {
    return <OrderCardSkeleton />;
  } else
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 15rem)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EmptyBox />
      </Box>
    );
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
