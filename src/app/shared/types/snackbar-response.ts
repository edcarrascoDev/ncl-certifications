export interface SnackbarResponseType {
  open: boolean;
  message: React.ReactNode;
  messageType?: "success" | "error";
  autoHideDuration?: number;
  onClose?: () => void;
}
