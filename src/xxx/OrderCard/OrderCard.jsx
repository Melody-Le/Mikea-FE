import React from "react";
import PurchaseCard from "../../Components/PurchaseCard/PurchaseCard";
import { Grid, Box, Divider, Typography } from "@mui/material";

function OrderCard() {
  return (
    <Box
      sx={{
        width: "90%",
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 3,
        backgroundColor: "var(--colorGreen)",
        marginTop: 3,
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography> 20 Nov 20022</Typography>
        <Typography> Total Price: 50$</Typography>
      </Box>
      <Divider sx={{ margin: 1 }} />
      <PurchaseCard />
      <PurchaseCard />
      <PurchaseCard />
      <PurchaseCard />
      <PurchaseCard />
      <PurchaseCard />
      <PurchaseCard />
      <PurchaseCard />
      <PurchaseCard />
    </Box>
  );
}

export default OrderCard;
