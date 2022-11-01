import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import { Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { formatCurrency } from "../../Utilities/formatCurrency";
import { titleCase } from "../../Utilities/titleCase";
import OutOfStock from "../Button/OutOfStock";
import "./PurchaseCard.scss";
import { typography } from "@mui/system";

function PurchaseCard() {
  const item = {
    variantImage:
      "https://i.pinimg.com/564x/2e/ed/c2/2eedc27581a1364e7a44760cb3171e25.jpg",
    productName: "Chair",
    variantDescription: "abc",
    variantId: "skuvafa",
    price: 30,
    qtyInStock: 20,
  };
  const {
    variantImage,
    productName,
    variantDescription,
    variantId,
    price,
    qtyInStock,
  } = item;
  return (
    <Paper
      sx={{
        color: "var(--color4a)",
        width: "100%",
        marginBottom: 1,
      }}
    >
      <Grid container spacing={0} margin={0} alignItems={"center"} gap={1}>
        <Grid item xs={3} padding={2}>
          {1 ? (
            <Avatar
              alt="haha"
              src={
                variantImage ||
                "https://i.pinimg.com/564x/2e/ed/c2/2eedc27581a1364e7a44760cb3171e25.jpg"
              }
              layout="fill"
              variant="rounded"
              padding={1}
              sx={{
                width: "100%",
                borderRadius: 1,
                border: "1",
              }}
            />
          ) : (
            <Skeleton variant="rectangle" animation="wave" width={"100%"} />
          )}
        </Grid>
        <Grid item xs={8}>
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
                {variantDescription}
              </Typography>
              <Typography className="variant-detail">
                SKU: {variantId}
              </Typography>
            </Box>
            <Typography marginRight={1} sx={{ color: "var(--color6)" }}>
              {formatCurrency(price) || "free"}
            </Typography>
            <Typography marginRight={1} sx={{ color: "var(--color6)" }}>
              Status: progress
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {qtyInStock > 0 ? (
              <Typography>Buy Again</Typography>
            ) : (
              <OutOfStock content="OUT OF STOCK" />
            )}
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
