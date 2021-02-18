import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@material-ui/core";

export default function Select(props) {
  const { label, name, value, error = null, onChange, options } = props;
  const convertToDefEventPara = (name, value) => ({
    currentTarget: {
      name,
      value,
    },
  });
  return (
    <FormControl
      variant="outlined"
      size="small"
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        id={name}
        name={name}
        value={value}
        onChange={(e) =>
          onChange(convertToDefEventPara(e.target.name, e.target.value))
        }
      >
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
