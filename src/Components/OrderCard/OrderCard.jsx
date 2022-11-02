import React from "react";
import PurchaseCard from "../PurchaseCard/PurchaseCard";
import { Box, Divider, Typography, Grid } from "@mui/material";
import { Stack } from "@mui/material";

function OrderCard() {
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
      <Box sx={{ alignSelf: "flex-start" }}>day time</Box>

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
      <Stack width={"100%"}>
        <PurchaseCard />
        <PurchaseCard />
        <PurchaseCard />
      </Stack>
      <Box sx={{ alignSelf: "flex-end" }}>Total Order Price: 100$</Box>
    </Box>
  );
}

export default OrderCard;
