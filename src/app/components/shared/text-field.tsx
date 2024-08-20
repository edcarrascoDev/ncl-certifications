import {
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
  TextFieldProps as TextFieldProps,
} from "@mui/material";
import { FormikHookResponse } from "@ncl/app/shared/types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

type TextField<TData> = TextFieldProps & {
  labelName: string;
  formik?: FormikHookResponse<TData>;
  name: keyof TData;
  groupClassname?: string;
  readOnly?: boolean;
};

export default function TextField<TData>({
  labelName,
  variant = "outlined",
  size = "small",
  fullWidth = true,
  id,
  formik,
  name,
  type,
  helperText,
  groupClassname,
  readOnly,
  ...props
}: TextField<TData>) {
  const [showPassword, setShowPassword] = useState<boolean>();
  return (
    <div className={`${groupClassname} mb-4`}>
      {labelName && (
        <label className="block mb-1 text-sm font-medium" htmlFor={id}>
          {labelName}
        </label>
      )}
      <MuiTextField
        id={id}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        name={name}
        value={formik?.values[name]}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        error={name && formik?.touched[name] && Boolean(formik?.errors[name])}
        helperText={
          (name && formik?.touched[name] && (formik?.errors[name] as string)) ||
          helperText
        }
        type={type !== "password" ? type : showPassword ? "text" : "password"}
        InputProps={{
          readOnly,
          endAdornment:
            type === "password" ? (
              <InputAdornment position={"end"}>
                <IconButton
                  size={"small"}
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize={"small"} />
                  ) : (
                    <Visibility fontSize={"small"} />
                  )}
                </IconButton>
              </InputAdornment>
            ) : (
              props.InputProps?.endAdornment
            ),
          ...props.InputProps,
        }}
        {...props}
      />
    </div>
  );
}
