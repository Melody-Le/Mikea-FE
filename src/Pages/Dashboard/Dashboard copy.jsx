import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Unstable_Grid2";
import useMediaQuery from "@mui/material/useMediaQuery";

import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ProfileTab from "./ProfileTab";
import MyPurchaseTab from "./MyPurchaseTab";
import "./Dashboard.scss";
import axios from "../../api/axios";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import AuthContext from "../../Context/AuthProvider";

function Dashboard() {
  const matches = useMediaQuery("(max-width:600px)");
  const params = useParams();
  const location = useLocation();

  const { auth } = useContext(AuthContext);
  const isAuth = !!auth?.email;
  const [profile, setProfile] = useState(null);
  const [tabValue, setTabValue] = useState("1");
  const [panel, setPanel] = useState(null);

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    if (auth?.email) {
      axiosPrivate.get(`/user`).then((response) => {
        setProfile(response.data);
      });
    }
  });
  useEffect(() => {
    if (profile) {
      setTabValue("2");
      return setPanel(<MyPurchaseTab />);
    }
  }, [location.pathname]);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
    switch (newTabValue) {
      case "1":
        setPanel(<ProfileTab profile={profile} />);
        break;
      case "2":
        setPanel(<MyPurchaseTab />);
        break;

      default:
        setPanel(<ProfileTab profile={profile} />);
    }
  };
  const themeTab = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            // display: "none",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            height: 0,
            paddingTop: 1,
            paddingBottom: 1,
            marginRight: 10,
            borderRadius: 5,
            // backgroundColor: "var(--color1)",
            color: "var(--color4)",
            minHeight: 38,
            ":hover": {
              // backgroundColor: "var(--colorGreen)",
              transition: "all 0.5s ease",
              color: "var(--color4a)",
            },
            "&.Mui-selected": {
              backgroundColor: "var(--colorGreen)",
              fontWeight: "bold",
              color: "var(--color4a)",
              ":hover": {
                backgroundColor: "var(--color4)",
                transition: "all 0.5s ease",
              },
            },
          },
        },
      },
    },
  });

  return profile ? (
    <>
      <Container>
        <ThemeProvider theme={themeTab}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
              marginBottom: 2,
            }}
          >
            <Tab value="1" label="My Profile" />
            <Tab value="2" label="My Purchase" />
          </Tabs>
        </ThemeProvider>
        <Box
          padding={1}
          border={"solid 1px var(--color4)"}
          sx={{
            borderRadius: 1,
            height: "60vh",
            border: "1",
          }}
          className="tab-box"
        >
          {panel}
        </Box>
      </Container>
    </>
  ) : (
    ""
  );
}

export default Dashboard;
