import React, { useEffect, useState } from "react";
import PurchaseCard from "../PurchaseCard/PurchaseCard";
import { Box, Divider, Typography, Grid } from "@mui/material";
import { Stack } from "@mui/material";
import { Skeleton } from "@mui/material";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

function OrderCard({ orderDetail, isLoading, setIsLoading }) {
  const axiosPrivate = useAxiosPrivate();
  const [orders, setOrders] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      try {
        const response = await axiosPrivate.get("/orders");
        setOrders(response.data.orderList);
        setIsLoading(false);
      } catch (err) {}
    }
    getData();
  }, []);

  const createdDate = new Date(orderDetail?.createdAt);
  const createdDateNice = createdDate
    .toString()
    .substring(0, createdDate.toString().indexOf("GMT"));

  let orderedProductToShow = [];
  if (orderDetail?.orderItems?.length) {
    orderedProductToShow = orders?.map((product, idx) => {
      const orderedProductDetail = {
        variantImage: product?.variantImage,
        productName: product?.productName,
        variantDescription: product?.variantDescription,
        variantId: product?.variantId,
        price: product?.price,
        qtyInStock: product?.qtyInStock,
      };
      return <PurchaseCard key={idx} productDetail={orderedProductDetail} />;
    });
  }
  return (
    <Box
      sx={{
        width: "95%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: 3,
        backgroundColor: "var(--colorTeal)",
        marginTop: 3,
        overflow: "auto",
      }}
    >
      {isLoading ? (
        <Skeleton variant="rectangle" animation="wave" width={"100%"} />
      ) : (
        <Box sx={{ alignSelf: "flex-start" }}>{createdDateNice}</Box>
      )}
      <Divider
        style={{ backgroundColor: "var(--color4a" }}
        variant="middle"
        width={"100%"}
        sx={{
          marginLeft: "5%",
          marginRight: "5%",
          marginY: 2,
        }}
      />
      <Stack width={"100%"}>{orderedProductToShow}</Stack>
      <Box sx={{ alignSelf: "flex-end" }}>Total Order Price: 100$</Box>
    </Box>
  );
}

export default OrderCard;
