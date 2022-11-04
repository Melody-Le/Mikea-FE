import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import AuthContext from "../../Context/AuthProvider";
import EditIcon from "@mui/icons-material/Edit";

function StepOne(props) {
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    if (auth?.email) {
      axiosPrivate.get(`/user`).then((response) => {
        setProfile(response.data);
      });
    }
  }, [auth]);

  return (
    <Box position={"relative"} sx={{ minHeight: "calc(100vh - 20rem)" }}>
      <Typography
        variant="h5"
        component="h5"
        marginTop={2}
        sx={{
          color: "var(--color4a)",
          textTransform: "capitalize",
          textAlign: "center",
        }}
      >
        Please double check your information Step 1
      </Typography>
      <Box
        sx={{
          paddingX: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <Box className="information-box">
          <Typography variant="subtitle1" className="text-field-title">
            Name
          </Typography>
          <TextField
            hiddenLabel
            fullWidth
            value={profile?.username || ""}
            size="small"
          />
        </Box>
        <Box className="information-box">
          <Typography variant="subtitle1" className="text-field-title">
            Email
          </Typography>
          <TextField
            hiddenLabel
            fullWidth
            disabled
            value={profile?.email || ""}
            size="small"
          />
        </Box>
        <Box className="information-box">
          <Typography variant="subtitle1" className="text-field-title">
            Address
          </Typography>
          <TextField
            hiddenLabel
            fullWidth
            value={profile?.address || ""}
            size="small"
          />
        </Box>
        <Box className="information-box">
          <Typography variant="subtitle1" className="text-field-title">
            Postal Code
          </Typography>
          <TextField
            hiddenLabel
            fullWidth
            value={profile?.postalCode || ""}
            size="small"
          />
        </Box>
        <Box className="information-box">
          <Typography variant="subtitle1" className="text-field-title">
            Phone number
          </Typography>
          <TextField
            hiddenLabel
            fullWidth
            value={profile?.phone || ""}
            size="small"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            marginTop: 3,
            justifyContent: "flex-end",
          }}
          className="information-box"
        >
          <Link to={`/user/edit`}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              style={{ textDecoration: "none" }}
              sx={{
                backgroundColor: "var(--color4-transparent)",
                color: "var(--color4a)",
                borderRadius: 1,
                padding: "8px",
                ":hover": {
                  border: "solid 1px var(--colorGreenBorder)",
                  backgroundColor: "var(--colorGreen)",
                },
              }}
            >
              Edit
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default StepOne;
