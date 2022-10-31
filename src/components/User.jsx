import { Typography } from "@mui/material";
import React, { useState, useEffect, useInsertionEffect } from "react";

import axios from "../api/axios";

function User() {
  // const [user, setUser] = useState([]);
  // useEffect(() => {
  //   const getUsers = async () => {
  //     try {
  //       const response = await axios.get("/users", {});
  //       console.log(response.data);
  //       setUser(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUsers();
  // }, []);
  // return (
  //   <div>
  //     <Typography>User Page:</Typography>
  //     {user?.length ? (
  //       <Typography>User</Typography>
  //     ) : (
  //       <Typography>No Products</Typography>
  //     )}
  //   </div>
  // );
}

export default User;
