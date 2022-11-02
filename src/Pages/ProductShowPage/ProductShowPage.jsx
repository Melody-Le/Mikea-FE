import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { Avatar, Box, Grid, Typography } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";

import axios from "../../api/axios";

function ProductShowPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [variantDetail, setVariantDetail] = useState({});

  useEffect(() => {
    async function getData() {
      try {
        const productResponse = await axios.get(`/products/${params.slug}`);
        setProduct(productResponse.data);
        // setIsLoading(true);
      } catch (err) {}
    }
    getData();
  }, []);
  let variantBox = [];
  if (product?.variants?.length) {
    variantBox = product?.variants.map((variant, idx) => {
      const { id, productId, qtyInStock, variantDescription, variantImage } =
        variant;

      // console.log("variant:", variantDetail);
    });
  }
  // console.log("variantsToShow:", variantsToShow);
  const productImagesArr = product?.productImages?.split(",") || [
    "https://i.pinimg.com/564x/2e/ed/c2/2eedc27581a1364e7a44760cb3171e25.jpg",
  ];
  return (
    <>
      <Typography>
        Products {">"} Chairs {">"} Office Chair
      </Typography>
      <Grid container gap={1}>
        <Grid item xs={4}>
          <AspectRatio ratio="1" objectFit="cover" variant="square">
            <Avatar
              className="product-image"
              alt={product?.productName}
              src={productImagesArr[0]}
              variant="rounded"
              sx={{
                width: "100%",
                height: "8rem",
                borderRadius: 3,
                objectFit: "contain",
              }}
            />
          </AspectRatio>
        </Grid>
        <Grid item xs={7}>
          <Typography>{product?.category?.categoryLabel}</Typography>
          <Typography>{product?.productName}</Typography>
          <Typography>{product?.productDescription}</Typography>
          <Typography>Area in use: {product?.room}</Typography>
          <Box minWidth={"8rem"}>{variantBox}</Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductShowPage;
