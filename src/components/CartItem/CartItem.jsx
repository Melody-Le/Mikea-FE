import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Avatar, Typography, Box, Grid } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useShoppingCart } from "../../Context/ShoppingCartContext";

import IconButton from "@mui/material/IconButton";

function CartItem(props) {
  const { cartQty, closeCart, cartItems } = useShoppingCart();
  const { variantImage } = props.item;
  return (
    <Paper
      sx={{
        color: "var(--color4a)",
        width: "100%",
        marginBottom: 1,
        marginLeft: "1rem",
      }}
    >
      <Grid container spacing={0} margin={0}>
        <Grid item xs={5} padding={5}>
          {props.item ? (
            <AspectRatio ratio="1" objectFit="cover" variant="square">
              <Avatar
                alt="haha"
                src="https://www.ikea.com/sg/en/images/products/fixa-tape-measure__0711978_pe728605_s5.jpg?f=xl"
                layout="fill"
                variant="rounded"
                padding={1}
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  border: "1",
                }}
              />
            </AspectRatio>
          ) : (
            <Skeleton variant="rectangle" animation="wave" width={"100%"} />
          )}
        </Grid>
        <Grid item xs={7}>
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
                to={`/`}
                component={Link}
                onClick={closeCart}
                sx={{
                  textDecoration: "none",
                  color: "var(--color4a)",
                }}
              >
                Product Name
              </Typography>
              <Typography>Variant description</Typography>
              <Typography>Variant detail</Typography>
            </Box>
            <Typography marginRight={1} sx={{ color: "var(--color6)" }}>
              Price
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Typography>Select Box</Typography>
            <Button>Remove</Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CartItem;
