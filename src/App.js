import "./App.css";
import ProductCard from "./components/ProductCard/ProductCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function App() {
  return (
    <div className="App">
      <Container>
        <Grid container spacing={3}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Grid>
      </Container>
    </div>
  );
}

export default App;
