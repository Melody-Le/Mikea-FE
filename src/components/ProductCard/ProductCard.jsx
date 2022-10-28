import React, { useEffect, useState, useContext } from "react";

import "./ProductCard.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
// import useMediaQuery from "@mui/material/useMediaQuery";
import AspectRatio from "@mui/joy/AspectRatio";
import { Button } from "@mui/material";

const ProductCard = (props) => {
  // const matches = useMediaQuery("(max-width:600px)");
  const {
    productName,
    categoryLabel,
    productDescription,
    productImages,
    variants,
    variantImage,
    variantPrice,
  } = props.product;
  const defaultPrice = variants[0]?.price;
  const [price, setPrice] = useState(defaultPrice || 0);
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
        </AspectRatio>
        <Box mt={1}>
          <Typography variant="body" className="category-label">
            {categoryLabel || "Ikea Clone"}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} marginY={1}>
          <Typography variant="body" className="product-name">
            {productName || "Mikea"}
          </Typography>
          <Typography variant="h6" className="price">
            ${price || "free"}
          </Typography>
        </Box>
        <Box>{variantBox}</Box>
      </Box>
    </Paper>
  );
};
export default ProductCard;
