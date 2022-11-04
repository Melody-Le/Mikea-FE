import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import "./Dashboard.scss";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

function ProfileTab({ profile }) {
  return (
    <Box position={"relative"}>
      <Link to={`/user/edit`}>
        <EditIcon
          sx={{
            marginY: 1,
            color: "var(--color2)",
            position: "absolute",
            top: 0,
            right: "1rem",
            ":hover": {
              color: "var(--color4a)",
            },
          }}
          className="icon"
          fontSize={"large"}
        />
      </Link>
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
        Hi {profile?.username} !
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "var(--color2)",
          textAlign: "center",
        }}
      >
        Personal information
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
            type="text"
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
            type="text"
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
            type="text"
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
            type="text"
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
            type="text"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileTab;
