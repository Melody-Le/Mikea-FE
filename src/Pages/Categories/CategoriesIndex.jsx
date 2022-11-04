import React, { useEffect, useState } from "react";

import { useParams, useLocation, Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "../../api/axios";
import CategoryBox from "../../Components/Category/CategoryBox";
import CategorySkeleton from "../Categories/CategorySkeleton";

import ProductCard from "../../Components/ProductCard/ProductCard";
import BreadcrumbsCustom from "../../Components/BreadcrumbsCustom/BreadcrumbsCustom";
import ProductsSkeleton from "../ProductsIndex/ProductsSkeleton";
function CategoriesIndex() {
  const location = useLocation();
  const currentLocation = location.pathname;
  const currentLocationState = location.state;

  const params = useParams();
  const matches = useMediaQuery("(max-width:600px)");
  const [isLoading, setIsLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  // fetch categories
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await axios.get(`/categories/${params.slug}`);
        const subCats = response?.data?.subCategories;
        if (subCats?.length) {
          setSubCategories(subCats);
          const productsRes = await axios.get(
            `/products?parentCat=${params.slug}`
          );
          setProducts(productsRes?.data);
          setIsLoading(false);
        } else {
          const productsRes = await axios.get(
            `/products?subCat=${params.slug}`
          );
          setProducts(productsRes?.data);
          setIsLoading(false);
        }
        return;
      } catch (err) {}
    }
    getData();
  }, [params]);

  let catToShow = [];
  if (subCategories?.length) {
    catToShow = subCategories?.map((cat, idx) => {
      const { categoryLabel, categorySlug, parentCategoryId, categoryImg } =
        cat;
      return (
        <Grid key={idx} xs={4} sm={2} md={2} item>
          <Link
            to={`/categories/${categorySlug}`}
            state={{ pathURL: `${currentLocation}/${categoryLabel}` }}
          >
            <Box position={"relative"}>
              <CategoryBox
                categoryLabel={categoryLabel}
                categoryImg={categoryImg}
                matches={matches}
              />
            </Box>
          </Link>
        </Grid>
      );
    });
  }

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
        productDescription,
        productImages: productImages,
        productName,
        variants,
        productSlug,
        categoryLabel: product?.category?.categoryLabel,
        categorySlug: product?.category?.categorySlug,
        parentCategorySlug: product?.category?.parentCategory?.categorySlug,
      };
      return (
        <Grid key={idx} xs={6} sm={4} md={3} item>
          <ProductCard
            product={productCardDetails}
            categoryPath={currentLocationState}
          />
        </Grid>
      );
    });
  }
  return (
    <>
      <BreadcrumbsCustom locationState={currentLocationState} />
      <Grid container spacing={1}>
        {!isLoading ? catToShow : <CategorySkeleton />}
      </Grid>
      <Grid container spacing={3} marginTop={5}>
        {/* {productCardsToShow} */}
        {!isLoading ? productCardsToShow : <ProductsSkeleton />}
      </Grid>
    </>
  );
}

export default CategoriesIndex;
