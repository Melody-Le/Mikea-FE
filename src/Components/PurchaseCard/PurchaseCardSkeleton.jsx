import { React } from "react";
import { Box, Grid } from "@mui/material";
import { Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import "./PurchaseCard.scss";

function PurchaseCardSkeleton() {
  return (
    <Paper
      sx={{
        color: "var(--color4a)",
        marginBottom: 1,
        boxShadow: 0,
        backgroundColor: "var(--colorTeal)",
      }}
    >
      <Grid container spacing={0} margin={0} alignItems={"center"} gap={1}>
        <Grid item xs={4} md={3} lg={2} padding={2}>
          <Skeleton
            variant="rectangle"
            animation="wave"
            width={"100%"}
            height={"8rem"}
          />
        </Grid>
        <Grid item xs={7} md={8} lg={9}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginTop: 1,
            }}
          >
            <Box>
              <Skeleton variant="rectangle" animation="wave" width={"100%"} />
              <Skeleton variant="rectangle" animation="wave" width={"100%"} />
              <Skeleton variant="rectangle" animation="wave" width={"100%"} />
            </Box>
            <Skeleton variant="rectangle" animation="wave" width={"100%"} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Skeleton variant="rectangle" animation="wave" width={"100%"} />
            <Button
              sx={{
                color: "var(--color4a)",
              }}
            ></Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PurchaseCardSkeleton;
