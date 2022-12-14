import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "../../api/axios";

import { Avatar, Box, Grid, Typography, Button } from "@mui/material";
import OutOfStock from "../../Components/Button/OutOfStock";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { formatCurrency } from "../../Utilities/formatCurrency";
import ProductShowPageSkeleton from "./ProductShowPageSkeleton";
import AspectRatio from "@mui/joy/AspectRatio";
import { LoadingButton } from "@mui/lab";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import BreadcrumbsCustom from "../../Components/BreadcrumbsCustom/BreadcrumbsCustom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import("./ProductShowPage.scss");

function ProductShowPage() {
  const { getLineItemQty, addToCart } = useShoppingCart();

  const location = useLocation();
  const currentLocationState = location.state;
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);

  const [variantDetail, setVariantDetail] = useState(null);
  const [productImage, setProductImage] = useState(
    product?.productImages ||
      "https://i.pinimg.com/564x/2e/ed/c2/2eedc27581a1364e7a44760cb3171e25.jpg"
  );
  const [productImgs, setProductImgs] = useState(null);
  let productImagesArr;
  useEffect(() => {
    async function getData() {
      try {
        const productResponse = await axios.get(`/products/${params.slug}`);
        const product = productResponse?.data;
        setProduct(product);
        const defaultVariant = {
          id: product?.variants[0]?.id,
          price: product?.variants[0]?.price,
          image: product?.variants[0]?.variantImage,
          qtyInStock: product?.variants[0]?.qtyInStock,
          variantDescription: product?.variants[0]?.variantDescription,
        };
        setVariantDetail(defaultVariant);
        productImagesArr = product?.productImages?.split(",") || [];
        setProductImgs(productImagesArr);
        setProductImage(productImagesArr[0]);
        setIsLoading(false);
        return;
      } catch (err) {}
    }
    getData();
  }, []);
  const cartItemQty = getLineItemQty(variantDetail?.variantId);

  let variantBox = [];
  if (product?.variants?.length) {
    variantBox = product?.variants.map((variant, idx) => {
      const { id, qtyInStock, variantDescription, variantImage, price } =
        variant;
      const setVariantTarget = (evnt) => {
        evnt.preventDefault();
        setVariantDetail({
          id,
          qtyInStock,
          variantDescription,
          variantImage,
          price,
        });
        setProductImage(variantImage);
      };

      return (
        <Button
          key={idx}
          onClick={setVariantTarget}
          position={"relative"}
          sx={{ padding: 0.5 }}
          onMouseOver={setVariantTarget}
        >
          <Avatar
            alt={product?.productName}
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
  const handleAddToCart = async (evnt) => {
    evnt.preventDefault();
    setIsAddToCartLoading(true);
    try {
      await addToCart(variantDetail?.id);
      setIsAddToCartLoading(false);
      return;
    } catch (error) {
      return;
    }
  };
  const setVariantTargetDefault = (evnt) => {
    evnt.preventDefault();
    const defaultVariant = {
      id: product?.variants[0]?.id,
      price: product?.variants[0]?.price,
      image: product?.variants[0]?.variantImage,
      qtyInStock: product?.variants[0]?.qtyInStock,
      variantDescription: product?.variants[0]?.variantDescription,
    };
    setVariantDetail(defaultVariant);
    setProductImage(productImgs[0]);
  };

  return (
    <>
      <BreadcrumbsCustom locationState={currentLocationState} />
      {!isLoading ? (
        <>
          <Grid container gap={3} marginTop={4}>
            <Grid item xs={12} sm={5} md={3}>
              <AspectRatio ratio="1" objectFit="cover" variant="square">
                <Avatar
                  className="product-image"
                  alt={product?.productName}
                  src={productImage}
                  onMouseOver={setVariantTargetDefault}
                  variant="rounded"
                  sx={{
                    width: "100%",
                    height: "8rem",
                    borderRadius: 3,
                    objectFit: "contain",
                    border: "solid 1px var(--color4)",
                    transition: "all 0.5s ease",
                  }}
                />
              </AspectRatio>
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
              <Typography sx={{ color: "var(--color2)", fontWeight: 500 }}>
                Category: {product?.category?.categoryLabel}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ color: "var(--color4a)", fontWeight: 600 }}>
                  {product?.productName}
                </Typography>
                <Typography sx={{ color: "var(--color4a)", fontWeight: 600 }}>
                  Price: {formatCurrency(variantDetail?.price) || "free"}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box minWidth={"8rem"}>{variantBox}</Box>
                {variantDetail?.qtyInStock === 0 ? (
                  <OutOfStock content="OUT OF STOCK" fontSize="10px" />
                ) : cartItemQty === variantDetail?.qtyInStock ? (
                  <OutOfStock content="ORDER LIMIT REACH" fontSize="8px" />
                ) : (
                  <LoadingButton
                    variant="rounded"
                    loading={isAddToCartLoading}
                    onClick={handleAddToCart}
                    sx={{
                      backgroundColor: "var(--color4-transparent)",
                      color: "var(--color4a)",
                      borderRadius: 1,
                      maxWidth: "4rem",
                      minWidth: "0.5rem",
                      maxHeight: "2.5rem",
                      paddingX: "20px",
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
              <Typography className="description-note">
                SKU: {variantDetail?.id}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "var(--color2)", fontWeight: 400 }}
              >
                Description
              </Typography>
              <Typography className="description-note">
                {variantDetail?.variantDescription}
              </Typography>

              <Typography className="description-note">
                {product?.productDescription}
              </Typography>
              <Typography className="description-note">
                Area in use: {product?.room}
              </Typography>
            </Grid>
            <ImageList
              sx={{ width: "100%" }}
              cols={3}
              rowHeight={164}
              style={{
                aspectRatio: 1 / 1,
              }}
            >
              {!!productImgs?.length &&
                productImgs?.map((item, idx) => (
                  <ImageListItem key={idx}>
                    <img
                      src={`${item}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={product?.productSlug}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
            </ImageList>
          </Grid>
        </>
      ) : (
        <ProductShowPageSkeleton />
      )}
    </>
  );
}

export default ProductShowPage;
