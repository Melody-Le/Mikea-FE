import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  height: "40%",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  width: "100%",
  marginLeft: theme.spacing(3),
  // width: "auto",
  [theme.breakpoints.up("sm")]: {
    marginRight: theme.spacing(1),
    width: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    width: "13ch",
    "&:focus": {
      width: "30ch",
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    marginTop: 4,
    [theme.breakpoints.up("lg")]: {
      width: "25ch",
      "&:focus": {
        width: "50ch",
      },
    },
    [theme.breakpoints.down("lg")]: {
      width: "8ch",
      "&:focus": {
        width: "14ch",
      },
    },
    [theme.breakpoints.down("md")]: {
      width: "5",
    },
    [theme.breakpoints.down("sm")]: {
      width: "0",
    },
  },
}));

export default function SearchBar() {
  const navigate = useNavigate();

  const handleSearchSubmit = (evnt) => {
    evnt.preventDefault();
    // navigate(`/search?q=${evnt.target.value}`);
    return;
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearchSubmit(e);
        }}
      />
    </Search>
  );
}
