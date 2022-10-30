import React from "react";
import Typography from "@mui/material/Typography";

function OutOfStock() {
  return (
    <Typography
      sx={{
        color: "var(--color4a)",
        marginRight: 3,
        backgroundColor: "var(--color5)",
        paddingX: 2,
        paddingY: "0.2rem",
        borderRadius: 2,
      }}
    >
      Out of Stock
    </Typography>
  );
}

export default OutOfStock;
