import React from "react";
import PurchaseCard from "../../Components/PurchaseCard/PurchaseCard";
import { Grid, Box } from "@mui/material";
import OrderCard from "../../Components/OrderCard/OrderCard";

function MyPurchaseTab() {
  return (
    <Box
      spacing={3}
      justifyContent={"center"}
      sx={{
        overflow: "auto",
        // backgroundColor: "var(--colorGreen)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <OrderCard />
    </Box>
  );
}

export default MyPurchaseTab;
