import React from "react";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Button, Grid, Typography } from "@mui/material";

import CartItem from "../CartItem/CartItem";
import AuthContext from "../../Context/AuthProvider";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useShoppingCart } from "../../Context/ShoppingCartContext";

function ShoppingCart({ isOpen }) {
  const { cartQty, closeCart, cartItems } = useShoppingCart();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const pages = ["products", "inspiration", "logout"];
  const lineItem = cartItems[0];
  // const {
  //   // id,
  //   cartId,
  //   variantId,
  //   qty,
  //   variant: {
  //     id: sku,
  //     productId,
  //     qtyInStock,
  //     variantDescription,

  //     variantImage,
  //   },
  // } = lineItem;

  const itemValue = {
    variantImage: lineItem?.variant.variantImage,
    variantId: lineItem?.variant?.id,
  };
  const cartItemBox = () => {
    return (
      <Grid xs={6} sm={4} md={3} item>
        <CartItem item={itemValue} />
      </Grid>
    );
  };

  const handleConfirm = () => {};
  const checkout = () => {};
  return (
    <>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "var(--colorGreen)",
            width: "50%",
            height: "100vh",
            border: 1,
          },
        }}
        anchor="right"
        open={isOpen}
        onClose={closeCart}
        padding={1}
      >
        <Grid
          container
          spacing={3}
          padding={3}
          // mt={1}
          sx={{
            height: "85vh",
            overflow: "auto",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontSize: "1.3rem" }}
            marginLeft={2}
          >
            Your Cart
          </Typography>
          <CartItem item={itemValue} />
          <CartItem item={itemValue} />
          <CartItem item={itemValue} />
          <CartItem item={itemValue} />
          <CartItem item={itemValue} />
        </Grid>
        <Box sx={{ paddingX: 3, marginTop: 1 }}>
          <Typography variant="subtitle1" sx={{ fontSize: "1.2rem" }}>
            Total price:
          </Typography>
          <Button
            onClick={checkout}
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "var(--color4)", marginTop: 1, padding: 1 }}
          >
            Check out
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default ShoppingCart;
