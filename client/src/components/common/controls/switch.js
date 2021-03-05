import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Switch as MuiSwitch,
} from "@material-ui/core/";

export default function Switch(props) {
  const {
    switchName = "",
    label,
    name,
    value,
    error = null,
    onChange,
    ...others
  } = props;

  const convertToDefEventPara = (name, value) => ({
    currentTarget: {
      name,
      value,
    },
  });

  return (
    <FormControl component="fieldset" {...(error && { error: true })}>
      <FormLabel component="legend">{switchName}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <MuiSwitch
              id={name}
              name={name}
              checked={value}
              {...others}
              onChange={(e) =>
                onChange(convertToDefEventPara(name, e.target.checked))
              }
            />
          }
          label={label}
        />
      </FormGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
