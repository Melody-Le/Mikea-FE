import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";

import { useShoppingCart } from "../../Context/ShoppingCartContext";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import AuthContext from "../../Context/AuthProvider";

function StepOne(props) {
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const [profile, setProfile] = useState(null);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);
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
  const handleUpdateInfo = async (evnt) => {
    evnt.preventDefault();
    try {
      setIsLoadingInfo(true);
      await axiosPrivate.put("/user", formData);
      setIsLoadingInfo(false);
    } catch (error) {}
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
            autoFocus
            name="phone"
          />
        </Box>
        <Box
          sx={{ display: "flex", gap: 3, marginTop: 3 }}
          className="information-box"
        >
          <LoadingButton
            size="small"
            loading={isLoadingInfo}
            onClick={handleUpdateInfo}
            startIcon={<SaveIcon />}
            loadingPosition="start"
            variant="contained"
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
            Save
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
}

export default StepOne;
