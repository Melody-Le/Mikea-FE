import axios from "../../api/axios";
import React, { useEffect, useState } from "react";

import ProductCard from "../../Components/ProductCard/ProductCard";
import { Grid } from "@mui/material";

function ProductsIndex() {
  const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      try {
        const productResponse = await axios.get("/products");
        setProducts(productResponse.data);
        // setIsLoading(true);
      } catch (err) {}
    }
    getData();
  }, []);
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
