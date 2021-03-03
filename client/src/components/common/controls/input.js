import React from "react";
import { TextField as MuiTextField } from "@material-ui/core";

// add textarea field later
export const TextField = (props) => {
  const { label, name, value, error = null, onChange, ...others } = props;
  return (
    <MuiTextField
      fullWidth
      size="small" // remove for normal size
      variant="outlined"
      label={label}
      id={name}
      name={name}
      value={value}
      {...others}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    ></MuiTextField>
  );
};

export default TextField;
