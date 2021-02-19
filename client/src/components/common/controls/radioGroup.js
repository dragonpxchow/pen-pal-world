import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@material-ui/core";

export default function RadioGroup(props) {
  const {
    label,
    name,
    value,
    error = null,
    onChange,
    items,
    ...others
  } = props;
  return (
    <FormControl>
      <FormLabel size="small">{label}</FormLabel>
      <MuiRadioGroup
        row
        id={name}
        name={name}
        value={value}
        {...others}
        onChange={onChange}
      >
        {items.map((item) => (
          <FormControlLabel
            size="small"
            key={item.id}
            value={item.id}
            control={<Radio size="small" color="primary" />}
            label={item.title}
          />
        ))}
      </MuiRadioGroup>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}
