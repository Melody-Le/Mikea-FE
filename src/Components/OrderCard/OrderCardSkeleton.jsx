import { Box, Divider } from "@mui/material";
import { Stack } from "@mui/material";
import { Skeleton } from "@mui/material";

import PurchaseCardSkeleton from "../PurchaseCard/PurchaseCardSkeleton";

function OrderCardSkeleton() {
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
      <Skeleton variant="rectangle" animation="wave" width={"100%"} />
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
        <PurchaseCardSkeleton />
        <PurchaseCardSkeleton />
      </Stack>
      <Skeleton variant="rectangle" animation="wave" width={"100%"} />
    </Box>
  );
}

export default OrderCardSkeleton;
