import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";

export default function Checkbox(props) {
  const { label, name, value, error = null, onChange, ...others } = props;

  const convertToDefEventPara = (name, value) => ({
    currentTarget: {
      name,
      value,
    },
  });

  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            size="medium"
            id={name}
            name={name}
            checked={value}
            {...others}
            onChange={(e) =>
              onChange(convertToDefEventPara(name, e.target.checked))
            }
            color="primary"
          />
        }
        label={label}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}
