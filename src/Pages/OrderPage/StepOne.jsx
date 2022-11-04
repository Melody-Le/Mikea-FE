import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";

import { useShoppingCart } from "../../Context/ShoppingCartContext";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import AuthContext from "../../Context/AuthProvider";
const steps = ["Check Information", "Review Order Item", "Payment"];

function StepOne(props) {
  const { auth } = useContext(AuthContext);
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
      <Typography
        variant="subtitle1"
        sx={{
          color: "var(--color2)",
          textAlign: "center",
        }}
      >
        Let's filling the empty fields
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
            hiddenLabel
            fullWidth
            value={formData?.username || ""}
            variant="filled"
            size="small"
            type="text"
            placeholder="Filling your display name on your profile"
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
            hiddenLabel
            fullWidth
            disabled
            value={formData?.email || ""}
            variant="filled"
            size="small"
            type="text"
            placeholder="Filling your display name on your profile"
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
            hiddenLabel
            fullWidth
            value={formData?.address || ""}
            variant="filled"
            size="small"
            type="text"
            placeholder="Filling your display name on your profile"
            autoFocus
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
            hiddenLabel
            fullWidth
            value={formData?.postalCode || ""}
            variant="filled"
            size="small"
            type="text"
            placeholder="Filling your display name on your profile"
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
            hiddenLabel
            fullWidth
            value={formData?.phone || ""}
            variant="filled"
            size="small"
            type="text"
            placeholder="Filling your display name on your profile"
            autoFocus
            name="phone"
          />
        </Box>
        <Box
          sx={{ display: "flex", gap: 3, marginTop: 3 }}
          className="information-box"
        ></Box>
      </Box>
    </Box>
  );
}

export default StepOne;