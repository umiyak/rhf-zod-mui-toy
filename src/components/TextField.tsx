import * as React from "react";
import { TextField as MUITextField } from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type MUITextFieldProps = React.ComponentProps<typeof MUITextField>;

type TextFieldProps = Pick<MUITextFieldProps, "required" | "label"> & {
  error?: FieldError | undefined;
  registration: Partial<UseFormRegisterReturn>;
};

export function TextField(props: TextFieldProps) {
  const { required, label, registration, error } = props;

  return (
    <MUITextField
      fullWidth
      margin="normal"
      size="small"
      required={required}
      label={label}
      InputLabelProps={{ shrink: true }}
      error={!!error}
      helperText={error?.message?.toString()}
      {...registration}
    />
  );
}
