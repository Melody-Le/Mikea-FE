import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/system";
export default function PageNotFound() {
  return (
    <>
      <Box sx={{ marginX: "auto" }}>
        <CardMedia
          sx={{ height: "30vh", marginX: "auto" }}
          component="video"
          alt="video"
          image="https://www.ikea.com/sg/en/static/mp4s/ufo.2d5c35ab6c116cc323bb.mp4"
          title="video"
          type="video/mp4"
          muted=""
          autoPlay
          muted
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ marginX: "auto", marginTop: "1rem" }} variant="h6">
            Oops! Something went wrong :(
          </Typography>
          <Typography
            sx={{ marginX: "auto", marginTop: "1rem" }}
            variant="body"
          >
            The page you are looking for can't be found.
          </Typography>
          <Typography
            sx={{ marginX: "auto", marginTop: "1rem" }}
            variant="body"
          >
            Maybe the links below can be helpful.
          </Typography>
          <Typography
            sx={{ marginX: "auto", marginTop: "1rem" }}
            variant="body"
            to="/"
            component={Link}
          >
            Go back to the MIKEA homepage
          </Typography>
        </Box>
      </Box>
    </>
  );
}
