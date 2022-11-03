import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Avatar, Box, Grid, Typography, Button, Skeleton } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import "./Home.scss";
import axios from "../../api/axios";
import CategorySkeleton from "./CategorySkeleton";
import useMediaQuery from "@mui/material/useMediaQuery";
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
        console.log("response?.data:", response?.data);
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
              <AspectRatio ratio="1" objectFit="cover" variant="square">
                <Avatar
                  alt={categoryLabel}
                  src={categoryImg}
                  variant="rounded"
                  sx={{
                    width: "100%",
                    borderRadius: 3,
                    transition: "all 3s ease",
                  }}
                />
              </AspectRatio>
              <Typography
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  right: "50%",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: matches ? "1rem" : "1.3rem",
                  color: "var(--colorwhite)",
                  width: "100%",
                  transform: "translateX(-50%) translateY(-50%)",
                  textShadow: "2px 2px 4px black",
                }}
              >
                {categoryLabel}
              </Typography>
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
            height: matches ? "8rem" : "20rem",
            borderRadius: 0,
            objectFit: "contain",
            border: "solid 1px var(--color4)",
            transition: "all 0.5s ease",
          }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: "1.2rem",
          fontWeight: 500,
          marginBottom: "1rem",
          color: "var(--color1)",
        }}
      >
        Caterogies
      </Typography>
      <Grid container spacing={1}>
        {!isLoading ? catToShow : <CategorySkeleton />}
      </Grid>
    </>
  );
}
