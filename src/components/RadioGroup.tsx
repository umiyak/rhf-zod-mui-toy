import * as React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MUIRadioGroup,
} from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type TextFieldProps = {
  options: {
    label: React.ReactNode;
    value: string | number;
  }[];
  label: string;
  defaultValue: string | number;
  row?: boolean;
  error?: FieldError | undefined;
  registration: Partial<UseFormRegisterReturn>;
};

export function RadioGroup(props: TextFieldProps) {
  const { options, label, defaultValue, row, registration, error } = props;

  return (
    <FormControl fullWidth margin="normal" error={!!error} size="small">
      <FormLabel>{label}</FormLabel>
      <MUIRadioGroup defaultValue={defaultValue} row={row} {...registration}>
        {options.map((option) => (
          <FormControlLabel
            key={option.label?.toString()}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </MUIRadioGroup>
    </FormControl>
  );
}
