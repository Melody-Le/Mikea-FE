import React from "react";
import { LoadingButton } from "@mui/lab";
function LoadingBtn(props) {
  return (
    <LoadingButton
      loading={props.loading}
      to={props.route}
      onClick={props.onClick}
      variant={props.variant}
      fullWidth={props.fullWidth}
      backgroundcolor={props.backgroundcolor || "var(--color4)"}
      sx={{
        backgroundColor: "var(--color4)",
        marginTop: props.marginTop,
        ":hover": {
          bgcolor: props.hoverBackgroundColor,
        },
      }}
    >
      {props.title}
    </LoadingButton>
  );
}

export default LoadingBtn;
