import React from "react";
import { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";

import Box from "@mui/material/Box";
import { Button, Grid, Typography } from "@mui/material";

import CartItem from "../CartItem/CartItem";
import AuthContext from "../../Context/AuthProvider";
import { useShoppingCart } from "../../Context/ShoppingCartContext";

function ShoppingCart({ isOpen }) {
  const { totalItemInCart, closeCart, cartItems } = useShoppingCart();
  const { auth } = useContext(AuthContext);

  let cartItemToShow = [];
  if (cartItems?.length) {
    cartItemToShow = cartItems.map((cardItem, idx) => {
      const cartItemDetail = {
        lineItemId: cardItem?.id,
        cartId: cardItem?.cartId,
        variantImage: cardItem?.variant?.variantImage,
        variantId: cardItem?.variant?.id,
        productName: cardItem?.variant?.product.productName,
        variantDescription: cardItem?.variant?.variantDescription,
        price: cardItem?.variant?.price,
        color: cardItem?.variant?.color,
        size: cardItem?.variant?.size,
        material: cardItem?.variant?.material,
        qtyInStock: cardItem?.variant?.qtyInStock,
      };
      return <CartItem key={idx} item={cartItemDetail} />;
    });
  }

  const checkout = () => {};
  return (
    <>
      {cartItemToShow.length && (
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "var(--colorGreen)",
              width: "50%",
              maxWidth: "50rem",
              height: "100vh",
              border: 1,
              justifyContent: "flex-start",
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
            sx={{
              maxHeight: "calc(100% - 5rem)",
              overflow: "auto",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "1.3rem" }}
              marginLeft={2}
              marginTop={1}
            >
              Your Cart
            </Typography>
            {cartItemToShow}
          </Grid>
          <Box sx={{ paddingX: 3, marginTop: 1, height: "5rem" }}>
            <Typography variant="subtitle1" sx={{ fontSize: "1.2rem" }}>
              Total price:
            </Typography>
            <Button
              onClick={checkout}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "var(--color4)",
                marginTop: 1,
                padding: 1,
                ":hover": {
                  bgcolor: "var(--color4a)",
                },
              }}
            >
              Check out
            </Button>
          </Box>
        </Drawer>
      )}
    </>
  );
}

export default ShoppingCart;
