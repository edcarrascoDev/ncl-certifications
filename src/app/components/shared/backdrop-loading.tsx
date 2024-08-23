import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
  open: boolean;
}
export default function BackdropLoading({ open }: Props) {
  return (
    <Backdrop open={open} sx={{ zIndex: 999 }}>
      <CircularProgress />
    </Backdrop>
  );
}
