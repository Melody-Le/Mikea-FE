import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import "./ProductCard.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import AspectRatio from "@mui/joy/AspectRatio";
import { Button } from "@mui/material";
import { formatCurrency } from "../../Utilities/formatCurrency";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import OutOfStock from "../Button/OutOfStock";

const ProductCard = (props) => {
  const { getLineItemQty, addToCart } = useShoppingCart();
  const {
    categoryLabel,
    productName,
    productImages,
    variants,
    productSlug,
    categorySlug,
    parentCategorySlug,
  } = props.product;
  const defaultVariant = {
    id: variants[0]?.id,
    price: variants[0]?.price,
    image: variants[0]?.variantImage,
    qtyInStock: variants[0]?.qtyInStock,
  };
  const [price, setPrice] = useState(defaultVariant.price || 0);
  const [variantId, setVariantId] = useState(defaultVariant.id);
  const [isLoading, setIsLoading] = useState(false);
  const [variantQtyInStock, setVariantQtyInStock] = useState(
    defaultVariant.qtyInStock
  );
  const cartItemQty = getLineItemQty(variantId);

  const handleAddToCart = async (evnt) => {
    evnt.preventDefault();
    setIsLoading(true);
    try {
      await addToCart(variantId);
      setIsLoading(false);
      return;
    } catch (error) {
      return;
    }
  };
  const productPathURL = parentCategorySlug
    ? `categories/${parentCategorySlug}/${categorySlug}/${productSlug}`
    : `categories/${categorySlug}/${productSlug}`;

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
        {props.product ? (
          <Link
            to={`/products/${productSlug}`}
            state={{ pathURL: productPathURL }}
          >
            <AspectRatio ratio="1" objectFit="cover" variant="square">
              <Avatar
                alt={productName}
                src={productImage}
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
            </AspectRatio>
          </Link>
        ) : (
          <Skeleton variant="rectangle" animation="wave" width={"100%"} />
        )}

        <Box mt={1}>
          <Typography variant="subtitle1" className="category-label">
            {categoryLabel || "Ikea Clone"}
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
          <Box minWidth={"8rem"}>{variantBox}</Box>

          {variantQtyInStock === 0 ? (
            <OutOfStock content="OUT OF STOCK" fontSize="10px" />
          ) : cartItemQty === variantQtyInStock ? (
            <OutOfStock content="ORDER LIMIT REACH" fontSize="8px" />
          ) : (
            <LoadingButton
              variant="rounded"
              loading={isLoading}
              onClick={handleAddToCart}
              sx={{
                backgroundColor: "var(--color4-transparent)",
                color: "var(--color4a)",
                borderRadius: 1,
                maxWidth: "4rem",
                minWidth: "0.5rem",
                padding: "8px",
                ":hover": {
                  border: "solid 1px var(--colorGreenBorder)",
                  backgroundColor: "var(--colorGreen)",
                },
              }}
            >
              <ShoppingBasketOutlinedIcon />
            </LoadingButton>
          )}
        </Box>
      </Box>
    </Paper>
  );
};
export default ProductCard;
