import * as React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type SelectProps = React.ComponentProps<typeof Select>;

type Option = {
  label: React.ReactNode;
  value: string | number;
};

type TextFieldProps = Pick<SelectProps, "label"> & {
  options: Option[];
  required?: boolean;
  error?: FieldError | undefined;
  registration: Partial<UseFormRegisterReturn>;
};

export function SelectField(props: TextFieldProps) {
  const { options, required, label, registration, error } = props;

  return (
    <FormControl
      fullWidth
      margin="normal"
      required={required}
      error={!!error}
      size="small"
    >
      <InputLabel shrink>{label}</InputLabel>
      <Select notched label={label} size="small" {...registration}>
        {options.map((option) => (
          <MenuItem key={option.label?.toString()} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
