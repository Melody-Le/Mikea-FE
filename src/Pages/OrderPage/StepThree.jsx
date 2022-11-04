import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import "./OrderPage.scss";

function StepThree() {
  return (
    <Box sx={{ marginX: "auto", minHeight: "calc(100vh - 20rem)" }}>
      <CardMedia
        sx={{ width: "30vh", height: "30vh", marginX: "auto", borderRadius: 5 }}
        alt="video"
        image="https://i.pinimg.com/originals/5f/dd/de/5fdddeab2b4d6ddd1c692e98f200148e.gif"
        title="video"
        autoPlay
        muted
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ marginX: "auto", marginTop: "1rem" }} variant="h6">
          Oops! Payment feature is on the way ... :(
        </Typography>
        <Typography sx={{ marginX: "auto", marginTop: "1rem" }} variant="body">
          You may checkout without payment by the link below then you can review
          your order in your dashboard!`
        </Typography>
      </Box>
    </Box>
  );
}
export default StepThree;
