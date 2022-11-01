import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import "./Modal.scss";

import AuthContext from "../../context/AuthProvider";
import Button from "../buttons/Button";

export default function LoginModal(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuth } = useContext(AuthContext);
  const { onClose, onConfirm, isOpen, defaultText, setNewText } = props;
  if (!isOpen) return null;

  const title = "Edit comment";
  const text = "Please enter your new comment text";
  

  const confirm = async (evnt) => {
    evnt.preventDefault();
    onConfirm();
  };

  const handleChange = (event) => {
    setNewText(event.target.value)
  }

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
          <TextField
        required
        hiddenLabel
        fullWidth
        variant="filled"
        type="text"
        className={'input-text'}
        onChange={handleChange}
        defaultValue={defaultText}
      />
        </Box>

        <Box padding={2}>
          <Button
            onClick={confirm}
            title="Confirm"
            variant="contained"
            category="action"
          />
          <Button
            onClick={onClose}
            title="Cancel"
            variant="outlined"
            category="action"
          />
        </Box>
      </div>
    </>
  );
}