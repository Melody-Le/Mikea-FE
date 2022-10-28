import axios from "../../api/axios";
import React, { useEffect, useState, useContext } from "react";

import AuthContext from "../../Context/AuthProvider";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

function ProductsIndex() {
  const { auth } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const productResponse = await axios.get("/products");
        setProducts(productResponse.data);
      } catch (err) {}
    }
    getData();
  }, []);
  // console.log(products[0]);
  let productDetail = {};
  if (products.length) {
    const { productDescription, productImages, productName, variants } =
      products[0];

    productDetail = {
      category: products[0]?.category?.categoryLabel,
      productDescription,
      productImages: productImages,
      productName,
      variants,
    };
  }
  let productCardsToShow = [];
  if (products?.length) {
    productCardsToShow = products?.map((product, idx) => {
      const { productDescription, productImages, productName, variants } =
        product;
      const productCardDetails = {
        category: product?.category?.categoryLabel,
        productDescription,
        productImages: productImages,
        productName,
        variants,
      };
      return (
        <Grid key={idx} xs={6} sm={4} md={3} item>
          <ProductCard product={productCardDetails} />
        </Grid>
      );
    });
  }
  return (
    <>
      <Grid container spacing={3}>
        {productCardsToShow}
      </Grid>
    </>
  );
}

export default ProductsIndex;
