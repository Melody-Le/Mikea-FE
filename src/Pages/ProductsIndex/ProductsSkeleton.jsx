import { Grid } from "@mui/material";
import ProductCardSkeleton from "../../Components/ProductCard/ProductCardSkeleton";
function ProductsSkeleton() {
  let productCardsToShow = [];
  productCardsToShow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
    (product, idx) => {
      return (
        <Grid key={idx} xs={6} sm={4} md={3} item>
          <ProductCardSkeleton />
        </Grid>
      );
    }
  );
  return <>{productCardsToShow}</>;
}
export default ProductsSkeleton;
