import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Avatar, Box, Grid, Typography, Button, Skeleton } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import "./Home.scss";
import axios from "../../api/axios";
import CategorySkeleton from "../Categories/CategorySkeleton";
import useMediaQuery from "@mui/material/useMediaQuery";
import CategoryBox from "../../Components/Category/CategoryBox";

export default function Home() {
  const matches = useMediaQuery("(max-width:600px)");
  const [categories, setcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/categories");
        setcategories(response?.data?.allCategories);
        setIsLoading(false);
      } catch (err) {}
    }
    getData();
  }, []);
  let catToShow = [];
  if (categories?.length) {
    catToShow = categories?.map((cat, idx) => {
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
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: 500,
          textAlign: "center",
          marginBottom: "1rem",
          color: "var(--color6)",
        }}
      >
        Explore What Your Home Needs!
      </Typography>
      <Box sx={{ display: "flex", marginBottom: 2 }}>
        <Box
          sx={{
            backgroundColor: "var(--color5)",
            width: "30%",
            fontSize: matches ? "2rem" : "5rem",
            fontWeight: 600,
            color: "var(--color4a)",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          Shop now
        </Box>
        <Avatar
          className="product-image"
          alt="homepage"
          src="https://images.pexels.com/photos/4112237/pexels-photo-4112237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          sx={{
            width: "70%",
            // height: "20rem",
            height: matches ? "8rem" : "23rem",
            borderRadius: 0,
            objectFit: "contain",
            border: "solid 1px var(--color4)",
            transition: "all 0.5s ease",
          }}
        />
      </Box>
      <Grid container spacing={1}>
        {!isLoading ? catToShow : <CategorySkeleton />}
      </Grid>
    </>
  );
}
