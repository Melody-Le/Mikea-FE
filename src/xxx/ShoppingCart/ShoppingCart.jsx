import React from "react";
import { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";

import Box from "@mui/material/Box";
import { Button, Grid, Typography } from "@mui/material";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Checkbox, { checkboxClasses } from "@mui/joy/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import CartItem from "../CartItem/CartItem";
import AuthContext from "../../Context/AuthProvider";

// import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { formatCurrency } from "../../Utilities/formatCurrency";

function ShoppingCart({ isOpen }) {
  const {
    totalItemInCart,
    closeCart,
    cartItems,
    preOrderList,
    setPreOrderList,
    createOrder,
  } = useShoppingCart();
  const { auth } = useContext(AuthContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartVariantIds = [];
  const lineItemInOrder = [];
  const initialCartVariantIdsBoolean = cartVariantIds.map((item) => !item); // convert all item in array into false value
  const [variantsOrder, setVariantsOrder] = useState(
    initialCartVariantIdsBoolean
  );
  const toggleVariantOrder = (index) => (event) => {
    const newVariants = [...variantsOrder];
    newVariants[index] = event.target.checked;
    setVariantsOrder(newVariants);
  };

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
      cartVariantIds.push(cartItemDetail?.variantId);
      lineItemInOrder.push({ id: cartItemDetail?.variantId });
      return (
        <ListItem key={idx}>
          {cartItemDetail?.qtyInStock > 0 ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={variantsOrder[idx] || false}
                  onChange={toggleVariantOrder(idx)}
                  checkedIcon={<LocalMallIcon />}
                  sx={{
                    color: "var(--color4a)",
                    "&.Mui-checked": {
                      color: "var(--colorGreen)",
                      border: "solid 1px var(--colorGreen)",
                    },
                  }}
                />
              }
            />
          ) : (
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  sx={{
                    color: "grey",
                  }}
                />
              }
            />
          )}

          <CartItem key={idx} item={cartItemDetail} />
        </ListItem>
      );
    });
  }

  const OrderVariantIndex = variantsOrder.flatMap((bool, index) =>
    bool ? index : []
  ); // return index of item get tick

  const orderVariantIDs = OrderVariantIndex.map((idx) => cartVariantIds[idx]); // get items List accept buy from user
  const lientItemsOnOrder = cartItems.filter((item) =>
    orderVariantIDs.includes(item.variantId)
  ); /// is an array of cartItemObj , have all value
  const updatedPrice = lientItemsOnOrder.reduce((prevPrice, curItem) => {
    return prevPrice + curItem?.qty * curItem?.variant?.price;
  }, 0);

  const checkout = async (evnt) => {
    evnt.preventDefault();
    try {
      await createOrder(orderVariantIDs);
      return;
    } catch (error) {}
  };
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
            {/* <Box role="group" aria-labelledby="member"> */}
            <List
              sx={{
                [`& .${checkboxClasses.root}`]: {
                  mr: "auto",
                  flexGrow: 1,
                  alignItems: "center",
                  flexDirection: "row-reverse",
                  gap: 1.5,
                },
              }}
            >
              {cartItemToShow}
            </List>
            {/* </Box> */}
          </Grid>
          <Box sx={{ paddingX: 3, marginTop: 1, height: "5rem" }}>
            <Typography variant="subtitle1" sx={{ fontSize: "1.2rem" }}>
              Total price:{formatCurrency(updatedPrice) || "free"}
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
