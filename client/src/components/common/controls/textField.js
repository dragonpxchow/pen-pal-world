import React from "react";
import { TextField as MuiTextField } from "@material-ui/core";

export const TextField = (props) => {
  const { label, name, value, onChange } = props;
  return (
    <MuiTextField
      size="small"
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error
      helperText="Some validation error"
    ></MuiTextField>
  );
};

export default TextField;
