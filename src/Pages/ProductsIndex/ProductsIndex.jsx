import axios from "../../api/axios";
import React, { useEffect, useState } from "react";

import ProductCard from "../../Components/ProductCard/ProductCard";
import { Grid } from "@mui/material";
import ProductsSkeleton from "./ProductsSkeleton";

function ProductsIndex() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        const productResponse = await axios.get("/products");
        setProducts(productResponse.data);
        setIsLoading(false);
      } catch (err) {}
    }
    getData();
  }, []);
  let productCardsToShow = [];
  if (products?.length) {
    productCardsToShow = products?.map((product, idx) => {
      const {
        productDescription,
        productImages,
        productName,
        variants,
        productSlug,
      } = product;
      const productCardDetails = {
        categoryLabel: product?.category?.categoryLabel,
        productDescription,
        productImages: productImages,
        productName,
        variants,
        productSlug,
        categorySlug: product?.category?.categorySlug,
        parentCategorySlug: product?.category?.parentCategory?.categorySlug,
      };
      return (
        <Grid key={idx} xs={6} sm={4} md={3} item sx={{ paddingTop: 0 }}>
          <ProductCard product={productCardDetails} />
        </Grid>
      );
    });
  }
  return (
    <>
      <Grid container spacing={3}>
        {!isLoading ? productCardsToShow : <ProductsSkeleton />}
      </Grid>
    </>
  );
}

export default ProductsIndex;
