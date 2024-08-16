import { Icon, Snackbar } from "@mui/material";
interface Props {
  open: boolean;
  message: React.ReactNode;
  messageType?: "success" | "error";
  autoHideDuration?: number;
  onClose?: () => void;
}
export default function SnackbarResponse({
  open,
  message,
  onClose,
  autoHideDuration = 6000,
  messageType = "success",
}: Props) {
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
