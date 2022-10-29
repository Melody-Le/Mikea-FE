import React from "react";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Avatar from "@mui/material/Avatar";

import ConfirmModal from "../modals/ConfirmModal";
import AuthContext from "../../Context/AuthProvider";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function DrawerComponent(props) {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  const {
    products,
    inspiration,
    login,
    signup,
    dashboard,
    logout,
    deleteAccount,
  } = props.pageLinks;
  const pages = props.isAuth
    ? [products, inspiration, logout]
    : [login, signup, products, inspiration];

  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState(null);
  const handleDeleteClick = () => {
    setOpen(false);
    setModalIsOpen(true);
  };
  const handleConfirm = () => {
    setModalIsOpen(false);
    axiosPrivate.delete("/user").then(
      (response) => {
        setSnackOpen(true);
        setSeverity("success");
        setMessage("Successfully deleted account");
        setTimeout(() => {
          navigate("/logout", { replace: true });
        }, 1000);
      },
      (error) => {
        setSeverity("error");
        setMessage("Failed to delete account");
      }
    );
  };
  const handleClose = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <Drawer
        PaperProps={{
          sx: { backgroundColor: "var(--colorGreen)" },
        }}
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {props.isAuth && (
            <>
              <ListItemButton
                key={0}
                to={`${dashboard.pageLink}`}
                component={Link}
                divider
              >
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="profileOwner" src={props.profileAvatarUrl} />
                </IconButton>
              </ListItemButton>
            </>
          )}

          {pages.map((page, index) => (
            <ListItemButton
              onClick={() => setOpen(false)}
              key={index}
              to={`${page.pageLink}`}
              component={Link}
              divider
            >
              <ListItemIcon>
                <ListItemText sx={{ color: "white" }}>
                  {page.pageName}
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
          <ListItemButton divider onClick={handleDeleteClick}>
            <ListItemIcon>
              <ListItemText sx={{ color: "white" }}>
                Delete Account
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto", color: "var(--color4)" }}
        onClick={() => setOpen(true)}
      >
        <MenuOutlinedIcon />
      </IconButton>
      <ConfirmModal
        isOpen={modalIsOpen}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason === "timeout") {
            setSnackOpen(false);
          }
        }}
      >
        <Alert severity={severity}>
          This is an error alert — check it out!
        </Alert>
      </Snackbar>
    </>
  );
}

export default DrawerComponent;
