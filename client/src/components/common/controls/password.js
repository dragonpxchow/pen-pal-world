import React, { useState } from "react";
//import clsx from "clsx";
//import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  IconButton,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";

/*
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));
*/
export const Password = (props) => {
  return (
    <div>
      <h1>Normal password</h1>
    </div>
  );
};

export const ShowPassword = (props) => {
  //const classes = useStyles();
  const { label, name, value, error = null, onChange, ...others } = props;

  const [isShowPassword, setShow] = useState(false);

  const handleClickShowPassword = () => {
    setShow(true);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      fullWidth
      size="small"
      //className={clsx(classes.root)}
      variant="outlined"
    >
      <InputLabel htmlFor="password" error={error ? true : false}>
        Password
      </InputLabel>
      <OutlinedInput
        label={label}
        id={name}
        name={name}
        type={isShowPassword ? "text" : "password"}
        value={value}
        {...others}
        onChange={onChange}
        error={error ? true : false}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {isShowPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};
