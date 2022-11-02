import React from "react";

import { Avatar, Box, Grid, Typography, Button } from "@mui/material";

import AspectRatio from "@mui/joy/AspectRatio";
import { Skeleton } from "@mui/material";
import("./ProductShowPage.scss");

function ProductShowPageSkeleton() {
  return (
    <>
      <Typography>
        <Skeleton variant="rectangle" animation="wave" width={"30%"} />
      </Typography>
      <Grid container gap={3} marginTop={4}>
        <Grid item xs={12} sm={5} md={3}>
          <AspectRatio ratio="1" objectFit="cover" variant="square">
            <Skeleton variant="rectangle" animation="wave" width={"100%"} />
          </AspectRatio>
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <Skeleton variant="rectangle" animation="wave" width={"30%"} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton variant="rectangle" animation="wave" width={"30%"} />
            <Skeleton variant="rectangle" animation="wave" width={"30%"} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box minWidth={"8rem"}>
              <Button position={"relative"} sx={{ padding: 0.5 }}>
                <Skeleton variant="rectangle" animation="wave" width={"100%"} />
              </Button>
            </Box>
            <Skeleton variant="rectangle" animation="wave" width={"30%"} />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{ color: "var(--color2)", fontWeight: 400 }}
          >
            Description
          </Typography>
          <Skeleton
            className="description-note"
            variant="rectangle"
            animation="wave"
            width={"100%"}
            height={"10rem"}
          />
          <Skeleton
            className="description-note"
            variant="rectangle"
            animation="wave"
            width={"30%"}
          />
          <Skeleton
            className="description-note"
            variant="rectangle"
            animation="wave"
            width={"30%"}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ProductShowPageSkeleton;
