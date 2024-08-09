import { PriorityHigh } from "@mui/icons-material";
export default function ErrorText({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className={"flex gap-2 my-3 text-sm text-error"}>
      <PriorityHigh color={"error"} /> {children}
    </div>
  );
}
