import React from "react";
import { Grid, Paper, Skeleton } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
export default function CategorySkeleton() {
  const catToShow = [1, 2, 3, 4, 5, 6].map((cat, idx) => {
    return (
      <Grid key={idx} xs={2} item>
        <Paper
          elevation={1}
          position={"relative"}
          sx={{
            borderRadius: 3,
          }}
        >
          <AspectRatio ratio="1" objectFit="cover" variant="square">
            <Skeleton
              variant="rectangle"
              animation="wave"
              sx={{
                width: "100%",
                borderRadius: 3,
                transition: "all 3s ease",
              }}
            />
          </AspectRatio>
        </Paper>
      </Grid>
    );
  });
  return <>{catToShow}</>;
}
