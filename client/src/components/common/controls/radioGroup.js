import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@material-ui/core";

export default function RadioGroup(props) {
  const { label, name, value, onChange, items } = props;
  return (
    <FormControl>
      <FormLabel size="small">{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
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
    </FormControl>
  );
}
