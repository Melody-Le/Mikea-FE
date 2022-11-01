import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Button, useTheme } from "@mui/material";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import "./SiteHeader.css";
import DrawerComponent from "./DrawerComponent";
import MenuBar from "./MenuBar";
import SearchBar from "./SearchBar";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import AuthContext from "../../Context/AuthProvider";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { titleCase } from "../../Utilities/titleCase";

function SiteHeader() {
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  const { openCart, totalItemInCart } = useShoppingCart();
  const isAuth = !!auth?.email;
  const axiosPrivate = useAxiosPrivate();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    if (auth?.email) {
      axiosPrivate.get(`/user`).then((response) => {
        setProfile(response.data);
      });
    }
  }, [auth, totalItemInCart]);

  let profileAvatarUrl;
  const defaultProfileAvatarUrl =
    "https://i.pinimg.com/564x/ea/69/33/ea693365e361f25b639914ef32f26de4.jpg";
  if (profile) {
    profileAvatarUrl =
      "https://i.pinimg.com/564x/ea/69/33/ea693365e361f25b639914ef32f26de4.jpg";
  } else profileAvatarUrl = defaultProfileAvatarUrl;

  const pageLinks = {
    products: {
      pageName: "Products",
      pageLink: "/products",
    },
    inspiration: {
      pageName: "Inspiration",
      pageLink: "/",
    },

    login: {
      pageName: "Login",
      pageLink: "/login",
    },
    signup: {
      pageName: "Signup",
      pageLink: "/register",
    },
    dashboard: {
      pageName: "Dashboard",
      pageLink: `/user`,
    },
    logout: {
      pageName: "Logout",
      pageLink: "/logout",
    },
    deleteAccount: {
      pageName: "Delete Account",
      pageLink: "/delete",
    },
  };
  const { products, inspiration, login, signup } = pageLinks;
  const pages = isAuth
    ? [products, inspiration]
    : [products, inspiration, login, signup];

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AppBar
      position="sticky"
      sx={{
        boxShadow: 1,
        backgroundColor: "rgba(255,255,255, 0.9)",
      }}
      className="site-header"
    >
      <Toolbar sx={{ backgroundColor: "rgba(var(--colorwhite)),var(--alpha)" }}>
        {isMatch ? (
          <>
            <Grid container sx={{ placeItems: "center" }}>
              <Typography
                variant="h6"
                marginTop="6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  textDecoration: "none",
                  color: "var(--color4)",
                }}
              >
                MIKEA
              </Typography>
              <Box
                sx={{
                  marginLeft: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <SearchBar />
                <DrawerComponent
                  isAuth={isAuth}
                  pageLinks={pageLinks}
                  profileAvatarUrl={profileAvatarUrl}
                />
              </Box>
            </Grid>
          </>
        ) : (
          <>
            <Grid container sx={{ placeItems: "center" }}>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  textDecoration: "none",
                  color: "var(--color4)",
                }}
              >
                MIKEA
              </Typography>
              <Grid item sx={{ marginLeft: "auto", color: "var(--color4)" }}>
                <Box
                  sx={{
                    display: "flex",
                    marginLeft: "auto",
                    alignItems: "center",
                  }}
                >
                  <SearchBar />
                  <List
                    sx={{
                      display: "flex",
                      marginLeft: "auto",
                    }}
                  >
                    {pages.map((page, index) => (
                      <ListItemButton
                        key={index}
                        to={`${page.pageLink}`}
                        component={Link}
                        sx={{
                          borderBottom: "0",
                          "&:hover": {
                            backgroundColor: "var(--color4)",
                          },
                        }}
                        divider
                      >
                        <ListItemIcon>
                          <ListItemText
                            sx={{
                              color: "var(--color4)",
                              "&:hover": {
                                color: "var(--color3)",
                              },
                            }}
                          >
                            {page.pageName}
                          </ListItemText>
                        </ListItemIcon>
                      </ListItemButton>
                    ))}
                  </List>
                  {totalItemInCart > 0 ? (
                    <IconButton
                      onClick={openCart}
                      aria-label="add to shopping cart"
                      size="small"
                      // href="/"
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--color4-transparent)",
                        color: "var(--color4a)",
                        borderRadius: 1,
                        position: "relative",
                      }}
                    >
                      <ShoppingBasketIcon />
                      <Box
                        sx={{
                          borderRadius: 5,
                          backgroundColor: "var(--color6)",
                          width: "1.5rem",
                          height: "1.5rem",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          transform: "translate(25%, 50%)",
                          display: "flex",
                          fontSize: "1rem",
                          color: "var(--colorwhite)",
                        }}
                      >
                        {totalItemInCart}
                      </Box>
                    </IconButton>
                  ) : (
                    ""
                  )}
                </Box>
              </Grid>
            </Grid>

            {isAuth && (
              <Box
                sx={{
                  // flexGrow: 1,
                  marginLeft: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color4a)",
                  minWidth: "6rem",
                }}
              >
                <MenuBar
                  pageLinks={pageLinks}
                  profileAvatarUrl={profileAvatarUrl}
                  marginTop={1}
                />
                <Typography sx={{ fontSize: "1rem" }}>
                  Hi {titleCase(profile?.username || "username")}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default SiteHeader;
