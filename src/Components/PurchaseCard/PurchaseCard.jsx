import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { formatCurrency } from "../../Utilities/formatCurrency";
import OutOfStock from "../Button/OutOfStock";
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
        <Grid item xs={4} md={3} lg={2} padding={2}>
          {isLoading ? (
            <Skeleton
              variant="rectangle"
              animation="wave"
              width={"100%"}
              height={"8rem"}
            />
          ) : (
            <Avatar
              alt={productName}
              src={
                variantImage ||
                "https://i.pinimg.com/564x/2e/ed/c2/2eedc27581a1364e7a44760cb3171e25.jpg"
              }
              // layout="fill"
              variant="rounded"
              sx={{
                width: "100%",
                height: "8rem",
                borderRadius: 3,
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
              <Typography marginRight={1} sx={{ color: "var(--color4a)" }}>
                Quantity purchased: {qty}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* {qtyInStock > 0 ? (
              <Typography>Buy Again</Typography>
            ) : (
              <OutOfStock content="OUT OF STOCK" />
            )} */}
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
