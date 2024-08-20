import {
  Radio,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioProps,
  FormHelperText,
} from "@mui/material";
import { FormikHookResponse } from "@ncl/app/shared/types";
import * as React from "react";

type OptionType = {
  label: React.ReactNode;
  value?: unknown;
};

type RadioGroupProps<TData> = RadioProps & {
  formLabel?: string;
  name: keyof TData;
  options: OptionType[];
  formik?: FormikHookResponse<TData>;
  error?: boolean;
  helperText?: React.ReactNode;
};

export default function RadioGroup<TData>({
  id,
  formLabel,
  name,
  options,
  formik,
  ...props
}: RadioGroupProps<TData>) {
  const error =
    (formik?.touched[name] && Boolean(formik?.errors[name] as keyof TData)) ||
    props.error;
  const helperText =
    (formik?.touched[name] && (formik?.errors[name] as string)) ||
    props.helperText;
  return (
    <FormControl>
      <FormLabel>{formLabel}</FormLabel>
      <MuiRadioGroup
        id={id}
        name={name}
        value={formik?.values[name]}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
      >
        {options.map((option, index) => (
          <FormControlLabel
            value={option.value as string}
            control={<Radio />}
            label={option.label}
            key={index}
          />
        ))}
      </MuiRadioGroup>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
