import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useContext } from "react";
import "./Modal.scss";

import AuthContext from "../../Context/AuthProvider";
import { Button } from "@mui/material";

export default function ConfirmModal(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuth } = useContext(AuthContext);
  const { onClose, onConfirm, isOpen } = props;
  if (!isOpen) return null;

  const title = "Confirm delete";
  const text = "Are you sure you would like to delete? This cannot be undone";

  const confirm = async (evnt) => {
    evnt.preventDefault();
    onConfirm();
  };

  return (
    <>
      <div className={"overlay"} onClick={onClose}></div>
      <div className={"modal"}>
        <Box className={"modal-content"}>
          <Typography variant={"h6"} className={"modal-title"}>
            {title}
          </Typography>

          <Typography variant={"body2"} className={"modal-text"}>
            {text}
          </Typography>

          <Typography variant={"caption"} className={"modal-error"}>
            {errorMessage}
          </Typography>
        </Box>

        <Box padding={2}>
          <Button onClick={confirm} variant="contained">
            Confirm
          </Button>
          <Button onClick={onClose} variant="contained">
            Cancel
          </Button>
        </Box>
      </div>
    </>
  );
}
