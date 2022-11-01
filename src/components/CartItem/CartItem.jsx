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
import "./CartItem.scss";

import IconButton from "@mui/material/IconButton";

function CartItem(props) {
  const axiosPrivate = useAxiosPrivate();
  const {
    totalItemInCart,
    closeCart,
    cartItems,
    getLineItemQty,
    removeFromCart,
    updateQtyLineItemQty,
  } = useShoppingCart();
  const {
    lineItemId,
    cartId,
    variantImage,
    variantId,
    productName,
    variantDescription,
    price,
    color,
    size,
    material,
    qtyInStock,
  } = props?.item;
  const selectionlineItemQtyArray = [...Array(qtyInStock).keys()].map(
    (i) => i + 1
  );
  const currentLineItemQty = getLineItemQty(variantId);
  const [lineItemQty, setlineItemQty] = useState(currentLineItemQty);
  const [openSelect, setOpenSelect] = useState(false);
  const handleSelectChange = async (event) => {
    const qtyChange = event.target.value;
    await updateQtyLineItemQty(variantId, qtyChange);
    setlineItemQty(qtyChange);
    return;
  };

  const handleSelectClose = () => {
    setOpenSelect(false);
  };

  const handleSelectOpen = () => {
    setOpenSelect(true);
  };
  const handleRemoveCartItem = async (evnt) => {
    evnt.preventDefault();
    try {
      await removeFromCart(variantId);
      return;
    } catch (error) {}
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
      <Grid container spacing={0} margin={0} alignItems={"center"} gap={1}>
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
                to={`/`}
                component={Link}
                onClick={closeCart}
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
                {" "}
                SKU: {variantId}
              </Typography>
              {color && (
                <Typography className="variant-detail">
                  {titleCase(color)}
                </Typography>
              )}
              {size && (
                <Typography className="variant-detail">
                  {titleCase(size) + " cm"}
                </Typography>
              )}
              {material && (
                <Typography className="variant-detail">
                  {titleCase(material)}
                </Typography>
              )}
            </Box>
            <Typography marginRight={1} sx={{ color: "var(--color6)" }}>
              {formatCurrency(price) || "free"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {qtyInStock > 0 ? (
              <FormControl sx={{ m: 2, minWidth: 120 }}>
                <InputLabel id="select-cart-item-qty-label">
                  Quantity
                </InputLabel>
                <Select
                  labelId="select-cart-item-qty-label"
                  id="select-cart-item-qty"
                  open={openSelect}
                  onClose={handleSelectClose}
                  onOpen={handleSelectOpen}
                  value={lineItemQty}
                  label="lineItemQty"
                  onChange={handleSelectChange}
                >
                  {selectionlineItemQtyArray.map((value, idx) => (
                    <MenuItem key={idx} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <OutOfStock content="OUT OF STOCK" />
            )}
            <Button
              onClick={handleRemoveCartItem}
              sx={{
                color: "var(--color4a)",
              }}
            >
              Remove
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CartItem;
