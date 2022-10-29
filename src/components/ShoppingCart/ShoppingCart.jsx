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
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Box from "@mui/material/Box";

import AuthContext from "../../Context/AuthProvider";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useShoppingCart } from "../../Context/ShoppingCartContext";

function ShoppingCart({ isOpen }) {
  const { cartQty, closeCart, cartItems } = useShoppingCart();
  console.log(cartQty);

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const pages = ["products", "inspiration", "logout"];

  const handleConfirm = () => {};
  return (
    <>
      <Drawer
        PaperProps={{
          sx: { backgroundColor: "var(--color1)" },
        }}
        anchor="right"
        open={isOpen}
        onClose={closeCart}
      >
        <List>
          <>
            <ListItemButton key={0} to={`/`} component={Link} divider>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="profileOwner" src="" />
              </IconButton>
            </ListItemButton>
          </>

          {pages.map((page, index) => (
            <ListItemButton
              onClick={closeCart}
              key={index}
              to={`${page.pageLink}`}
              component={Link}
              divider
            >
              <ListItemIcon>
                <ListItemText sx={{ color: "white" }}>
                  {page.pageName}
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
          <ListItemButton divider onClick={handleConfirm}>
            <ListItemIcon>
              <ListItemText sx={{ color: "white" }}>
                Delete Account
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}

export default ShoppingCart;
