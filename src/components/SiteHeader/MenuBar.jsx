import * as React from "react";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

import ConfirmModal from "../modals/ConfirmModal";
import AuthContext from "../../Context/AuthProvider";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function MenuBar(props) {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const { dashboard, logout } = props.pageLinks;
  const pages = [dashboard, logout];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [open, setOpen] = useState(false);

  const [severity, setSeverity] = useState(null);
  const [message, setMessage] = useState(null);
  const handleDeleteClick = () => {
    setAnchorElUser(null);
    setModalIsOpen(true);
  };
  const handleConfirm = () => {
    setModalIsOpen(false);
    axiosPrivate.delete("/user").then(
      (response) => {
        setOpen(true);
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
    <div>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginTop: 0.7 }}>
          <Avatar alt="profileOwner" src={props.profileAvatarUrl} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {pages.map((page, index) => (
          <MenuItem
            key={index}
            onClick={handleCloseUserMenu}
            to={`${page.pageLink}`}
            component={Link}
          >
            <Typography textAlign="center">{page.pageName}</Typography>
          </MenuItem>
        ))}
        <MenuItem onClick={handleDeleteClick}>
          <Typography textAlign="center">Delete Account</Typography>
        </MenuItem>
      </Menu>
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
            setOpen(false);
          }
        }}
      >
        <Alert variant="filled" severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default MenuBar;
