import React from "react";
import { LoadingButton } from "@mui/lab";
function LoadingBtn(props) {
  return (
    <LoadingButton
      className={props.className}
      loading={props.loading}
      to={props.route}
      onClick={props.onClick}
      variant={props.variant}
      fullWidth={props.fullWidth}
    >
      {props.title}
    </LoadingButton>
  );
}

export default LoadingBtn;
