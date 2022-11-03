import React from "react";

import { Avatar, Box, Typography } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";

function CategoryBox(props) {
  const { categoryLabel, categoryImg, matches } = props;
  return (
    <Box position={"relative"}>
      <AspectRatio ratio="1" objectFit="cover" variant="square">
        <Avatar
          alt={categoryLabel}
          src={categoryImg}
          variant="rounded"
          sx={{
            width: "100%",
            borderRadius: 3,
            transition: "all 3s ease",
          }}
        />
      </AspectRatio>
      <Typography
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          right: "50%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: 600,
          fontSize: matches ? "1rem" : "1.3rem",
          color: "var(--colorwhite)",
          width: "100%",
          transform: "translateX(-50%) translateY(-50%)",
          textShadow: "2px 2px 4px black",
        }}
      >
        {categoryLabel}
      </Typography>
    </Box>
  );
}

export default CategoryBox;
