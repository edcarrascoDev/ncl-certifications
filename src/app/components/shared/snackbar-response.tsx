import { Icon, Snackbar } from "@mui/material";
import { SnackbarResponseType } from "@ncl/app/shared/types";

export default function SnackbarResponse({
  open,
  message,
  onClose,
  autoHideDuration = 6000,
  messageType = "success",
}: SnackbarResponseType) {
  const icon = messageType === "success" ? "check_circle" : "error";
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      message={
        <div className={"flex items-center justify-between gap-2"}>
          {message} <Icon color={messageType}>{icon}</Icon>
        </div>
      }
    />
  );
}
