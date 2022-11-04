import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/system";

function EmptyBox() {
  return (
    <Box sx={{ marginX: "auto" }}>
      <CardMedia
        sx={{ height: "40vh", marginX: "auto", borderRadius: 5 }}
        alt="empty cart"
        image="https://cdn.dribbble.com/users/634336/screenshots/2246883/media/21b6eeac8c36a79c6b4b2a1930bd89a6.png"
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography sx={{ marginX: "auto", marginTop: "1rem" }} variant="body">
          Lets go Shopping by visit the lik below:
        </Typography>
        <Typography
          variant="body"
          to="/products"
          component={Link}
          sx={{
            paddingX: 2,
            paddingY: 1,
            borderRadius: 3,
            width: "10rem",
            textAlign: "center",
            marginTop: "1rem",
            ":hover": {
              border: "solid 1px var(--colorGreenBorder)",
              backgroundColor: "var(--colorGreen)",
            },
          }}
          style={{
            textDecoration: "none",
            color: "var(--color4a)",
            backgroundColor: "var(--colorGreen)",
          }}
        >
          Go Shopping
        </Typography>
      </Box>
    </Box>
  );
}

export default EmptyBox;
