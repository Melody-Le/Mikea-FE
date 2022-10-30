import React from "react";
import { useEffect, useState, useContext } from "react";

import Box from "@mui/material/Box";
import "./Dashboard.scss";
import { Typography } from "@mui/material";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import AuthContext from "../../Context/AuthProvider";

function ProfileTab({ profile }) {
  const { auth } = useContext(AuthContext);
  const isAuth = !!auth?.email;
  const axiosPrivate = useAxiosPrivate();

  console.log("profile is: ", profile);
  return (
    <Box>
      <Typography>Hello</Typography>
    </Box>
  );
}

export default ProfileTab;
