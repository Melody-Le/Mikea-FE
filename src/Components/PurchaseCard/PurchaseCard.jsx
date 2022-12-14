import { React } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { formatCurrency } from "../../Utilities/formatCurrency";
import "./PurchaseCard.scss";

function PurchaseCard({ orderDetail, isLoading }) {
  const defautItem = {
    variantImage:
      "https://i.pinimg.com/564x/2e/ed/c2/2eedc27581a1364e7a44760cb3171e25.jpg",
    productName: "Chair",
    variantDescription: "abc",
    variantId: "skuvafa",
    price: 30,
    qty: 2,
  };

  const {
    variantImage,
    productName,
    variantDescription,
    variantId,
    price,
    qty,
  } = orderDetail ? orderDetail : defautItem;
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
        <Grid item xs={3} md={2} lg={2} padding={2}>
          {isLoading ? (
            <Skeleton
              variant="rectangle"
              animation="wave"
              width={"100%"}
              height={"10rem"}
            />
          ) : (
            <Avatar
              className="product-image"
              alt={productName}
              src={
                variantImage ||
                "https://i.pinimg.com/564x/2e/ed/c2/2eedc27581a1364e7a44760cb3171e25.jpg"
              }
              variant="rounded"
              sx={{
                width: "100%",
                height: "10rem",
                borderRadius: 3,
                objectFit: "contain",
              }}
            />
          )}
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
              <Typography
                variant="h6"
                sx={{
                  textDecoration: "none",
                  color: "var(--color4a)",
                }}
              >
                {productName}
              </Typography>
              <Typography className="variant-detail">
                SKU: {variantId}
              </Typography>

              <Typography className="variant-detail">
                Description: {variantDescription}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography marginRight={1} sx={{ color: "var(--color4a)" }}>
                Price :{formatCurrency(price) || "free"}
              </Typography>
              {qty ? (
                <Typography marginRight={1} sx={{ color: "var(--color4a)" }}>
                  Quantity: {qty}
                </Typography>
              ) : (
                ""
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              to={`/`}
              component={Link}
              sx={{
                color: "var(--color4a)",
              }}
            >
              Visit product
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PurchaseCard;
