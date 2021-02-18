import React from "react";
import { TextField as MuiTextField } from "@material-ui/core";

// add textarea field later
export const TextField = (props) => {
  const { label, name, value, error = null, onChange } = props;
  return (
    <MuiTextField
      size="small"
      variant="outlined"
      label={label}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    ></MuiTextField>
  );
};

export default TextField;
