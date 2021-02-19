import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField as MuiTextField } from "@material-ui/core";
//import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

// check this out later https://stackoverflow.com/questions/59654537/how-to-style-inputadornment-like-notched-outlinedinput
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
}));

// add textarea field later
export const TextField = (props) => {
  const classes = useStyles();
  const { label, name, value, error = null, onChange, ...others } = props;
  return (
    <MuiTextField
      fullWidth
      size="small"
      variant="outlined"
      label={label}
      id={name}
      name={name}
      value={value}
      className={classes.root}
      {...others}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    ></MuiTextField>
  );
};

export default TextField;
