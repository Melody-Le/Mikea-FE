import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { Avatar, Box, Grid, Typography, Button, Skeleton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "../../api/axios";
import CategoryBox from "../../Components/Category/CategoryBox";
import CategorySkeleton from "../Categories/CategorySkeleton";

function CategoriesIndex() {
  const params = useParams();
  const matches = useMediaQuery("(max-width:600px)");
  const [isLoading, setIsLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isParentCat, setIsparentCat] = useState(true);
  // fetch categories
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/categories/${params.slug}`);
        const subCats = response?.data?.subCategories;
        setSubCategories(subCats);
        // setIsLoading(false);
        return;
      } catch (err) {}
    }
    getData();
  }, []);
  // fetch products
  useEffect(() => {
    async function getData() {
      if (isParentCat) {
        try {
          const response = await axios.get(
            `/products?parentCat=${params.slug}`
          );
          const products = response?.data;
          console.log(products);
          return;
        } catch (err) {}
      } else {
        const response = await axios.get(`/products?subCat=${params.slug}`);
        const products = response?.data;
        console.log(products);
        return;
      }
    }
    getData();
  }, []);
  let catToShow = [];
  if (subCategories?.length) {
    catToShow = subCategories?.map((cat, idx) => {
      const { categoryLabel, categorySlug, parentCategoryId, categoryImg } =
        cat;
      return (
        <Grid key={idx} xs={4} sm={2} md={2} item>
          <Link to={`/categories/${categorySlug}`}>
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
  return (
    <>
      <Grid container spacing={1}>
        {!isLoading ? catToShow : <CategorySkeleton />}
      </Grid>
    </>
  );
}

export default CategoriesIndex;
