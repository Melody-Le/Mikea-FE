import * as React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useTheme } from "@mui/material";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import "./SiteHeader.css";
import DrawerComponent from "./DrawerComponent";
import MenuBar from "./MenuBar";
import SearchBar from "./SearchBar";
// import axios from "../../api/axios";

// import AuthContext from "../../context/AuthProvider";

function SiteHeader() {
  // const { auth } = useContext(AuthContext);
  // const isAuth = !!auth?.username;
  const isAuth = false;
  const [profile, setProfile] = useState(null);
  // useEffect(() => {
  //   if (auth?.username) {
  //     axios.get(`/users/${auth?.username}`).then((response) => {
  //       setProfile(response.data);
  //     });
  //   }
  // }, [auth]);
  let profileAvatarUrl;
  const defaultProfileAvatarUrl =
    "https://i.pinimg.com/564x/ea/69/33/ea693365e361f25b639914ef32f26de4.jpg";
  if (profile) {
    profileAvatarUrl = profile?.profile_pic_url;
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
    cart: {
      pageName: "Cart",
      pageLink: "/cart",
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
  const { products, inspiration, cart, login, signup } = pageLinks;
  const pages = isAuth
    ? [products, inspiration, cart]
    : [products, inspiration, cart, login, signup];

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="relative"
      sx={{ backgroundColor: "var(--color1)" }}
      className="site-header"
    >
      <Toolbar sx={{ backgroundColor: "var(--color1)" }}>
        {isMatch ? (
          <>
            <Grid container sx={{ placeItems: "center" }}>
              <AdbIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                marginTop="6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  textDecoration: "none",
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
              <AdbIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  textDecoration: "none",
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
                            backgroundColor: "var(--color2)",
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
                </Box>
              </Grid>
            </Grid>

            {isAuth && (
              <Box
                sx={{
                  flexGrow: 1,
                  marginLeft: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <MenuBar
                  pageLinks={pageLinks}
                  profileAvatarUrl={profileAvatarUrl}
                  marginTop={1}
                />
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default SiteHeader;
