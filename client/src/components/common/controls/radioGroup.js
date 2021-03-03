import React from "react";
import PropType from "prop-types";
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
    options,
    textOption,
    valueOption,
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
        {options.map((item) => (
          <FormControlLabel
            size="small"
            key={item[valueOption]}
            value={item[valueOption]}
            control={<Radio size="small" color="primary" />}
            label={item[textOption]}
          />
        ))}
      </MuiRadioGroup>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}

// defaultProps make it generic for most object using name and _id, but can override if different
RadioGroup.defaultProps = {
  textOption: "name",
  valueOption: "_id",
};

RadioGroup.propType = {
  name: PropType.string.isRequired,
  options: PropType.array.isRequired,
  onChange: PropType.array.isRequired,
  // ...
};
