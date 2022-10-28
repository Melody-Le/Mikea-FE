import React, { useEffect, useState, useContext } from "react";

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
// import useMediaQuery from "@mui/material/useMediaQuery";

import { formatCurrency } from "../../Utilities/formatCurrency";

const ProductCard = (props) => {
  // const matches = useMediaQuery("(max-width:600px)");
  const {
    productName,
    category,
    productDescription,
    productImages,
    variants,
    variantImage,
    variantPrice,
  } = props.product;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
  }, [props.product?.productImages]);

  const defaultPrice = variants[0]?.price;
  const [price, setPrice] = useState(defaultPrice || 0);
  const addToCart = (evnt) => {
    evnt.preventDefault();
    console.log("add");
  };
  const [productImage, setProductImage] = useState(
    productImages ||
      "https://i.pinimg.com/564x/2e/ed/c2/2eedc27581a1364e7a44760cb3171e25.jpg"
  );
  let variantBox = "";
  if (variants?.length) {
    variantBox = variants?.map((variant, idx) => {
      const { variantImage, price } = variant;
      const getPrice = (evnt) => {
        evnt.preventDefault();
        setPrice(price);
        setProductImage(variantImage);
      };
      return (
        <Button key={idx} onClick={getPrice}>
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
              padding: "0.2rem",
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
          {isLoading ? (
            <Avatar
              alt={productName}
              src={productImage}
              layout="fill"
              variant="rounded"
              sx={{
                width: "100%",
                // height: matches ? "10rem" : "30rem",
                borderRadius: 4,
                transition: "all 3s ease", //FIXME: not work
              }}
              onMouseOver={(evnt) => {
                setProductImage(variants[0]?.variantImage || productImages);
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
          <Typography variant="body" className="category-label">
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
          <Typography variant="h6" className="price">
            {formatCurrency(price) || formatCurrency(0)}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          onClick={addToCart}
        >
          <Box>{variantBox}</Box>
          <IconButton
            aria-label="add to shopping cart"
            size="small"
            href="/"
            variant="rounded"
            sx={{
              backgroundColor: "var(--color4-transparent)",
              color: "var(--color4a)",
              borderRadius: 30,
              // width: "2.5rem",
            }}
          >
            <ShoppingBasketOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};
export default ProductCard;
