import { Icon } from "@mui/material";

export default function SuccessText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"flex gap-2 my-3 text-sm text-primary"}>
      <Icon color={"success"}>check_circle</Icon> {children}
    </div>
  );
}
