import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./ProductCard.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import AspectRatio from "@mui/joy/AspectRatio";
import { Button } from "@mui/material";
import { formatCurrency } from "../../Utilities/formatCurrency";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import axios from "../../api/axios";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import AuthContext from "../../Context/AuthProvider";
import CartItem from "../CartItem/CartItem";
import OutOfStock from "../Button/OutOfStock";
import { typography } from "@mui/system";
import { Add } from "@mui/icons-material";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const {
    totalItemInCartemInCart,
    closeCart,
    cartItems,
    getLineItemQty,
    addToCart,
    fetchCart,
  } = useShoppingCart();
  const isAuth = !!auth?.email;
  const axiosPrivate = useAxiosPrivate();
  const { productName, category, productImages, variants } = props.product;
  const defaultVariant = {
    id: variants[0]?.id,
    price: variants[0]?.price,
    image: variants[0]?.variantImage,
    qtyInStock: variants[0]?.qtyInStock,
  };
  const [price, setPrice] = useState(defaultVariant.price || 0);
  const [variantId, setVariantId] = useState(defaultVariant.id);
  const [variantQtyInStock, setVariantQtyInStock] = useState(
    defaultVariant.qtyInStock
  );
  const cartItemQty = getLineItemQty(variantId);

  const handleAddToCart = async (evnt) => {
    evnt.preventDefault();
    try {
      await addToCart(variantId);
      return;
    } catch (error) {
      return;
    }
  };

  const [productImage, setProductImage] = useState(
    productImages ||
      "https://i.pinimg.com/564x/2e/ed/c2/2eedc27581a1364e7a44760cb3171e25.jpg"
  );
  let variantBox = "";
  if (variants?.length) {
    variantBox = variants?.map((variant, idx) => {
      const { id, variantImage, price, qtyInStock } = variant;

      const setVariantTarget = (evnt) => {
        evnt.preventDefault();
        setPrice(price);
        setProductImage(variantImage);
        setVariantId(id);
        setVariantQtyInStock(qtyInStock);
      };
      return (
        <Button
          key={idx}
          onClick={setVariantTarget}
          position={"relative"}
          sx={{ padding: 0.5 }}
        >
          <Avatar
            alt={productName}
            src={
              variantImage ||
              "https://i.pinimg.com/564x/2e/ed/c2/2eedc27581a1364e7a44760cb3171e25.jpg"
            }
            layout="fill"
            variant="rounded"
            sx={{
              width: "100%",
              borderRadius: 1,
              border: "solid 1px var(--color4)",
              padding: "0.3rem",
              // height: "3rem",
              objectFit: "cover",
            }}
          />
        </Button>
      );
    });
  }
  return (
    <Paper elevation={5} sx={{ borderRadius: 4 }}>
      <Box padding={1}>
        <AspectRatio ratio="1" objectFit="cover" variant="square">
          {props.product ? (
            <Avatar
              alt={productName}
              src={productImage}
              layout="fill"
              variant="rounded"
              sx={{
                width: "100%",
                borderRadius: 4,
                transition: "all 3s ease", //FIXME: not work
              }}
              onMouseOver={(evnt) => {
                setProductImage(defaultVariant.image || productImages);
              }}
              onMouseLeave={(evnt) => {
                setProductImage(productImages);
              }}
            />
          ) : (
            <Skeleton variant="rectangle" animation="wave" width={"100%"} />
          )}
        </AspectRatio>

        <Box mt={1}>
          <Typography variant="subtitle1" className="category-label">
            {category || "Ikea Clone"}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          marginY={1}
          alignItems={"flex-start"}
        >
          <Typography variant="body" className="product-name">
            {productName || "Mikea"}
          </Typography>

          <Typography variant="subtitle1" className="price">
            {formatCurrency(price) || "free"}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            minWidth={"8rem"}
            // sx={{ display: "flex", justifyContent: "flex-start", padding: 0 }}
          >
            {variantBox}
          </Box>
          <Box>
            {variantQtyInStock === 0 ? (
              <OutOfStock content="OUT OF STOCK" fontSize="10px" />
            ) : cartItemQty === variantQtyInStock ? (
              <OutOfStock content="ORDER LIMIT REACH" fontSize="8px" />
            ) : (
              <IconButton
                aria-label="add to shopping cart"
                size="small"
                variant="rounded"
                onClick={handleAddToCart}
                sx={{
                  backgroundColor: "var(--color4-transparent)",
                  color: "var(--color4a)",
                  borderRadius: 30,
                }}
              >
                <ShoppingBasketOutlinedIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
export default ProductCard;
