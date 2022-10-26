import "./ProductCard.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import AspectRatio from "@mui/joy/AspectRatio";
// import Image from "next/image";

const ProductCard = () => {
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <Grid item xs={3}>
      <Paper elevation={5} sx={{ borderRadius: 4 }}>
        <Box padding={1}>
          <AspectRatio ratio="1" objectFit="cover" variant="square">
            <Avatar
              alt="Mountains"
              src="https://www.ikea.com/sg/en/images/products/svenarum-side-table-bamboo-white__1061735_pe850534_s5.jpg?f=xl"
              layout="fill"
              variant="rounded"
              sx={{
                width: "100%",
                // height: matches ? "10rem" : "30rem",
                borderRadius: 4,
              }}
            />
          </AspectRatio>
          <Box mt={1}>
            <Typography variant="body" className="category-label">
              Side Table
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} marginY={1}>
            <Typography variant="body" className="product-name">
              SVENARUM
            </Typography>
            <Typography variant="h6" className="price">
              30$
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} marginY={1}>
            <AspectRatio ratio="1" objectFit="cover" variant="square">
              <Avatar
                alt="Mountains"
                src="https://www.ikea.com/sg/en/images/products/svenarum-side-table-bamboo-white__1061735_pe850534_s5.jpg?f=xl"
                layout="fill"
                variant="rounded"
                sx={{
                  width: "100%",
                  // height: matches ? "10rem" : "30rem",
                  borderRadius: 4,
                }}
              />
            </AspectRatio>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};
export default ProductCard;
