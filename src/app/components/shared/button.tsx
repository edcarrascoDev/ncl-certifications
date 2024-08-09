import { Icon } from "@mui/material";

interface ButtonProps {
  disabled?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button";
  children?: React.ReactNode;
  startIcon?: string;
  endIcon?: string;
  onClick?: () => void;
  fullwidth?: boolean;
  color?: "primary" | "secondary" | "success" | "warning" | "light";
}
export default function Button({
  color = "primary",
  type = "button",
  children,
  className,
  startIcon,
  endIcon,
  fullwidth = false,
  ...props
}: ButtonProps) {
  return (
    <button
      data-tw-classes={
        "bg-primary bg-secondary bg-light text-primary text-white"
      }
      className={`cnl-button bg-${color} text-${color === "light" ? "primary" : "white"} ${className} ${fullwidth ? "w-full" : "w-auto"}`}
      type={type}
      {...props}
    >
      {startIcon && <Icon sx={{ fontSize: 16 }}>{startIcon}</Icon>}
      <span>{children}</span>
      {endIcon && <Icon sx={{ fontSize: 16 }}>{endIcon}</Icon>}
    </button>
  );
}
