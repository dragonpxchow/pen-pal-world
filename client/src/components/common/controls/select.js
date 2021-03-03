import React from "react";
import PropType from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1), // did not work as expected, see input
  },
}));

export default function Select(props) {
  const classes = useStyles;
  const {
    label,
    name,
    value,
    error = null,
    onChange,
    options,
    textOption,
    valueOption,
  } = props;
  const convertToDefEventPara = (name, value) => ({
    currentTarget: {
      name,
      value,
    },
  });
  return (
    <FormControl
      className={clsx(classes.margin)}
      variant="outlined"
      size="small"
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        className={clsx(classes.margin)}
        label={label}
        id={name}
        name={name}
        value={value}
        onChange={(e) =>
          onChange(convertToDefEventPara(e.target.name, e.target.value))
        }
        /* is there onBlur event ??
        onBlur={(e) =>
          onChange(convertToDefEventPara(e.target.name, e.target.value))
        }
        */
      >
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item[valueOption]} value={item[valueOption]}>
            {item[textOption]}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

// defaultProps make it generic for most object using name and _id, but can override if different
Select.defaultProps = {
  textOption: "name",
  valueOption: "_id",
};

Select.propType = {
  name: PropType.string.isRequired,
  options: PropType.array.isRequired,
  onChange: PropType.array.isRequired,
  // ...
};
