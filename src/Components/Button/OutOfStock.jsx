import React from "react";
import Typography from "@mui/material/Typography";

function OutOfStock(props) {
  const { marginRight, content, fontSize } = props;
  return (
    <Typography
      sx={{
        color: "var(--color4a)",
        marginRight: { marginRight },
        backgroundColor: "var(--color5)",
        paddingX: 1,
        paddingY: "0.2rem",
        borderRadius: 2,
        fontSize: { fontSize },
        textAlign: "center",
      }}
    >
      {content}
    </Typography>
  );
}

export default OutOfStock;
