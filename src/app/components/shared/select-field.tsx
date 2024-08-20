import {
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
  SelectProps,
} from "@mui/material";
import * as React from "react";
import { FormikHookResponse } from "@ncl/app/shared/types";

type OptionType = {
  children: React.ReactNode;
  value?: string | readonly string[] | number | undefined;
};

type SelectFieldProps<TData> = SelectProps & {
  label: string;
  helperText?: React.ReactNode;
  hasNoneValue?: boolean;
  options: OptionType[];
  formik?: FormikHookResponse<TData>;
  name: keyof TData;
  groupClassname?: string;
};

export default function SelectField<TData>({
  label,
  fullWidth = true,
  hasNoneValue,
  id,
  options,
  formik,
  name,
  groupClassname,
  ...props
}: SelectFieldProps<TData>) {
  const error =
    (formik?.touched[name] && Boolean(formik?.errors[name] as keyof TData)) ||
    props.error;
  const helperText =
    (formik?.touched[name] && (formik?.errors[name] as string)) ||
    props.helperText;
  return (
    <FormControl className={`${groupClassname} !mb-4`} fullWidth={fullWidth}>
      <label className={"block mb-1 text-sm font-medium"} id={`${id}_label`}>
        {label}
      </label>
      <Select
        labelId={`${id}_label`}
        id={id}
        name={name}
        error={error}
        value={formik?.values[name]}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        {...props}
      >
        {hasNoneValue && (
          <MenuItem value="">
            <em>Ninguno</em>
          </MenuItem>
        )}
        {options.map((option, index) => (
          <MenuItem value={option.value} key={index}>
            {option.children}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
