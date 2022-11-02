import React, { useEffect, useState } from "react";
import PurchaseCard from "../PurchaseCard/PurchaseCard";
import { Box, Divider, Typography, Grid } from "@mui/material";
import { Stack } from "@mui/material";
import OrderCardSkeleton from "./OrderCardSkeleton";

function OrderCard({ orderDetail, isLoading }) {
  const createdDate = new Date(orderDetail?.createdAt);
  const createdDateNice = createdDate
    .toString()
    .substring(0, createdDate.toString().indexOf("GMT"));
  // const [totalPrice, setTotalPrice] = useState(0);

  let orderedProductToShow = [];
  if (orderDetail?.orderItems?.length) {
    orderedProductToShow = orderDetail?.orderItems?.map((product, idx) => {
      const productDetail = {
        variantImage: product?.variantImage,
        productName: product?.productName,
        variantDescription: product?.variantDescription,
        variantId: product?.variantId,
        price: product?.price,
        qty: product?.qty,
      };
      return <PurchaseCard key={idx} orderDetail={productDetail} />;
    });
  } else {
    return <OrderCardSkeleton />;
  }

  const totalPrice = orderDetail?.orderItems.reduce((prevPrice, curItem) => {
    return prevPrice + curItem?.qty * curItem?.price;
  }, 0);

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
      <Box
        sx={{
          alignSelf: "flex-start",
          backgroundColor: "var(--colorGreen)",
          border: "solid 1px var(--colorGreenBorder)",
          paddingY: 1,
          paddingX: 2,
          borderRadius: 3,
          color: "var(--color6)",
        }}
      >
        {createdDateNice}
      </Box>
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
      <Box
        sx={{
          alignSelf: "flex-end",
          marginRight: "4rem",

          paddingY: 1,
          paddingX: 2,
          borderRadius: 3,
          color: "var(--color6)",
          ":hover": {
            backgroundColor: "var(--colorGreen)",
            border: "solid 1px var(--colorGreenBorder)",
            transition: "all 0.5s ease",
            cursor: "pointer",
          },
        }}
      >
        Total Order Price: {totalPrice}$
      </Box>
    </Box>
  );
}

export default OrderCard;
