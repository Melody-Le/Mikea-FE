import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { Stack } from "@mui/material";

import OrderCard from "../../Components/OrderCard/OrderCard";
import OrderCardSkeleton from "../../Components/OrderCard/OrderCardSkeleton";

function MyPurchaseTab() {
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
  } else {
    return <OrderCardSkeleton />;
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
