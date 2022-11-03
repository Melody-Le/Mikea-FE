import "./ProductCard.css";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import AspectRatio from "@mui/joy/AspectRatio";
import { Button, Paper } from "@mui/material";
const ProductCardSkeleton = () => {
  const variantBox = [0, 1]?.map((variant, idx) => {
    return (
      <Button key={idx} position={"relative"} sx={{ padding: 0.5 }}>
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            width: "100%",
            borderRadius: 1,
            height: "2rem",
          }}
        />
      </Button>
    );
  });
  return (
    <Paper elevation={5} sx={{ borderRadius: 4 }}>
      <Box padding={1}>
        <AspectRatio ratio="1" objectFit="cover" variant="square">
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              width: "100%",
              borderRadius: 4,
            }}
          />
        </AspectRatio>
        <Box mt={1}>
          <Skeleton variant="rounded" animation="wave" width={"100%"} />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          marginY={1}
          alignItems={"flex-start"}
        >
          <Skeleton variant="rounded" animation="wave" width={"30%"} />
          <Skeleton variant="rounded" animation="wave" width={"30%"} />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Skeleton variant="rounded" animation="wave" width={"30%"} />
          <Box minWidth={"8rem"}>{variantBox}</Box>
          <Skeleton variant="rounded" animation="wave" width={"20%"} />
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductCardSkeleton;
