import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function BreadcrumbsCustom({ locationState }) {
  const pathnames = locationState?.pathURL
    .toLowerCase()
    .split("/")
    .filter((x) => x);

  return (
    <Stack spacing={2} marginBottom={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {pathnames?.map((name, index) => {
          const niceName = name?.replaceAll("-", " ");
          const isLast = index === pathnames.length - 1;
          return index == 0 ? (
            <Link
              key={index}
              to="/"
              style={{
                textDecoration: "none",
                color: "var(--color4a)",
                textTransform: "capitalize",
                fontSize: "1.2rem",
              }}
            >
              Home
            </Link>
          ) : isLast ? (
            <Typography
              key={name}
              style={{ fontSize: "1.2rem", textTransform: "capitalize" }}
            >
              {niceName}
            </Typography>
          ) : (
            <Link
              key={index}
              to={`/categories/${pathnames[index]}`}
              state={{ pathURL: `/categories/${pathnames[index]}` }}
              style={{
                textDecoration: "none",
                color: "var(--color4a)",
                textTransform: "capitalize",
                fontSize: "1.2rem",
              }}
            >
              {niceName}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Stack>
  );
}

export default BreadcrumbsCustom;
