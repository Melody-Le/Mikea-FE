import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Typography, Box, Grid } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";

function CartItem(props) {
  const { cartQty, closeCart, cartItems, getCartItemQty } = useShoppingCart();
  const { variantImage, variantId } = props?.item;
  const currentCartItemQty = getCartItemQty(variantId);
  const [cartItemQty, setCartItemQty] = useState(currentCartItemQty);
  const [openSelect, setOpenSelect] = useState(false);
  const handleSelectChange = (event) => {
    setCartItemQty(event.target.value);
  };

  const handleSelectClose = () => {
    setOpenSelect(false);
  };

  const handleSelectOpen = () => {
    setOpenSelect(true);
  };
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
        <Grid item xs={3} padding={2}>
          {props.item ? (
            <AspectRatio ratio="1" objectFit="cover" variant="square">
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
            <Typography>{cartItemQty}</Typography>
            <FormControl sx={{ m: 5, minWidth: 120 }}>
              <InputLabel id="select-cart-item-qty-label">Quantity</InputLabel>
              <Select
                labelId="select-cart-item-qty-label"
                id="select-cart-item-qty"
                open={openSelect}
                onClose={handleSelectClose}
                onOpen={handleSelectOpen}
                value={cartItemQty}
                label="cartItemQty"
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
            <Button>Remove</Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CartItem;
