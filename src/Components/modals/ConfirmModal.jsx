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
      <div className={"modal"} sx={{ borderRadius: 3 }}>
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

        <Box
          padding={2}
          sx={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
        >
          <Button
            onClick={confirm}
            variant="contained"
            sx={{
              backgroundColor: "var(--colorGreen)",
              color: "var(--color4a)",
              borderRadius: 1,
              position: "relative",
              "&:hover": {
                transition: "all 0.3s ease",
                backgroundColor: "var(--colorGreen)",
                border: "solid 1px var(--colorGreenBorder)",
              },
            }}
          >
            Confirm
          </Button>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              backgroundColor: "var(--color4)",
              color: "var(--colorwhite)",
              borderRadius: 1,
              position: "relative",
              "&:hover": {
                transition: "all 0.3s ease",
                backgroundColor: "var(--colorGreen)",
                border: "solid 1px var(--colorGreenBorder)",
                color: "var(--color4a)",
              },
            }}
          >
            Cancle
          </Button>
        </Box>
      </div>
    </>
  );
}
