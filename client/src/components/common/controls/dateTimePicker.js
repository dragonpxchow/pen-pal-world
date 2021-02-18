import React from "react";
import { FormHelperText } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker as MuiKeyboardDatePicker,
} from "@material-ui/pickers";

// https://material-ui-pickers.dev/getting-started/installation
// add DatePicker, TimePicker and DateTimePicker later
export default function KeyboardDatePicker(props) {
  const { label, name, value, error = null, onChange } = props;
  const convertToDefEventPara = (name, value) => ({
    currentTarget: {
      name,
      value,
    },
  });
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <MuiKeyboardDatePicker
        autoOk={true}
        orientation="landscape"
        size="small"
        disableToolbar={false}
        variant="inline"
        inputVariant="outlined"
        format="dd/MM/yyyy"
        margin="normal"
        label={label}
        id={name}
        name={name}
        value={value}
        onChange={(date) => {
          onChange(convertToDefEventPara(name, date));
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        {...(error && { error: true, helperText: error })}
      />
    </MuiPickersUtilsProvider>
  );
}
