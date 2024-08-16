import Button from "@ncl/app/components/shared/button";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

interface Props {
  open: boolean;
  handleClose: (value: boolean) => void;
  title?: string;
  message?: string;
}

export default function ConfirmationDialog({
  open,
  handleClose,
  title,
  message,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancelar</Button>
        <Button onClick={() => handleClose(true)} color="error">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
