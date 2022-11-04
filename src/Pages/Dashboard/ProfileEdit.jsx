import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Box from "@mui/material/Box";
import "./Dashboard.scss";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import AuthContext from "../../Context/AuthProvider";

function ProfileEdit() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const isAuth = !!auth?.email;
  const axiosPrivate = useAxiosPrivate();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    postalCode: "",
    phone: "",
  });
  useEffect(() => {
    if (auth?.email) {
      axiosPrivate.get(`/user`).then((response) => {
        setProfile(response.data);
        setFormData(response.data);
      });
    }
  }, [auth]);

  const handleInputChange = (evnt) => {
    setFormData({
      ...formData,
      [evnt.target.name]: evnt.target.value,
    });
  };

  const handleSubmit = async (evnt) => {
    evnt.preventDefault();
    try {
      await axiosPrivate.put("/user", formData);
      setTimeout(navigate, 500, `/user`);
    } catch (error) {}
  };

  return (
    <Box position={"relative"}>
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
        Update Profile information!
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: "var(--color2)",
          textAlign: "center",
        }}
      >
        Let's filling the empty fields or revise the information
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
            onChange={handleInputChange}
            required
            // hiddenLabel
            fullWidth
            value={formData?.username || ""}
            variant="filled"
            size="small"
            type="text"
            autoFocus
            name="username"
          />
        </Box>
        <Box className="information-box">
          <Typography variant="subtitle1" className="text-field-title">
            Email
          </Typography>
          <TextField
            onChange={handleInputChange}
            required
            // hiddenLabel
            fullWidth
            disabled
            value={formData?.email || ""}
            variant="filled"
            size="small"
            type="text"
            autoFocus
            name="email"
          />
        </Box>
        <Box className="information-box">
          <Typography variant="subtitle1" className="text-field-title">
            Address
          </Typography>
          <TextField
            onChange={handleInputChange}
            required
            // hiddenLabel
            fullWidth
            value={formData?.address || ""}
            variant="filled"
            size="small"
            type="text"
            name="address"
          />
        </Box>
        <Box className="information-box">
          <Typography variant="subtitle1" className="text-field-title">
            Postal Code
          </Typography>
          <TextField
            onChange={handleInputChange}
            required
            // hiddenLabel
            fullWidth
            value={formData?.postalCode || ""}
            variant="filled"
            size="small"
            type="text"
            name="postalCode"
          />
        </Box>
        <Box className="information-box">
          <Typography variant="subtitle1" className="text-field-title">
            Phone number
          </Typography>
          <TextField
            onChange={handleInputChange}
            required
            // hiddenLabel
            fullWidth
            value={formData?.phone || ""}
            variant="filled"
            size="small"
            type="text"
            name="phone"
          />
        </Box>
        <Box
          sx={{ display: "flex", gap: 3, marginTop: 3 }}
          className="information-box"
        >
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "var(--color4)",
              marginTop: 2,
              ":hover": {
                bgcolor: "var(--color4a)",
              },
            }}
            to="/user"
            component={Link}
          >
            Cancle
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "var(--color4)",
              marginTop: 2,
              ":hover": {
                bgcolor: "var(--color4a)",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileEdit;
