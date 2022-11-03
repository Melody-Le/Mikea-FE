import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link, Navigate } from "react-router-dom";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { cardClasses } from "@mui/material";

function BreadcrumbsCustom({ locationState }) {
  const navigate = useNavigate();
  const pathnames = locationState?.pathURL
    .toLowerCase()
    .split("/")
    .filter((x) => x);

  // const url = "categories/table-and-desk/coffee-table/bekant";
  // const pathnames = url?.split("/").filter((x) => x);

  return (
    <Stack spacing={2}>
      {/* <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link to="/">Home</Link>
        <Link to={`/categories/${pathnames[1]}`}>{pathnames[1]}</Link>
        <Link to={`/categories/${pathnames[2]}`}>{pathnames[2]}</Link>
        <Typography key={pathnames[3]}>{pathnames[3]}</Typography>
      </Breadcrumbs> */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {pathnames.map((name, index) => {
          const routeTo = `categories/${pathnames
            .slice(index + 1, index + 2)
            .join("/")}`;
          console.log(routeTo);
          {
            const isLast = index === pathnames.length - 1;
            return index == 0 ? (
              <Link key={index} to="/">
                Home
              </Link>
            ) : isLast ? (
              <Typography key={name}>{name}</Typography>
            ) : (
              <Link key={index} to={`/categories/${pathnames[index]}`}>
                {name}
              </Link>
            );
          }
        })}
      </Breadcrumbs>
    </Stack>
  );
}

export default BreadcrumbsCustom;
