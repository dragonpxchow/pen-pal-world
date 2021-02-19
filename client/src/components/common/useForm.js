import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import * as yup from "yup";

export function useForm(
  initialFieldValues,
  initialErrorValues,
  validationSchema
) {
  const isEmpty = require("is-empty");
  // the useState() hook allows our component to hold its own internal state
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState(initialErrorValues);

  const validateInput = async ({ name, value }) => {
    // field validation (client side)
    // name , value is object restructing of e.curretnTarget
    // field validation
    let inputError = "";
    const options = { abortEarly: true }; // validating one field only

    await yup
      .reach(validationSchema, name)
      .validate(value, options)
      .then(() => {
        // no error
        inputError = "";
      })
      .catch((error) => {
        // got error
        inputError = error.message;
      });
    return inputError;
  };

  /*
  const handleOnBlur = async ({ currentTarget: input }) => {
    // field validation on blur but not in used (client side)
    // input is e.currentTarget
    // eg.  input.name === username

    const { name, value } = input;
    const errorMessage = await validateInput(input);
    setErrors({ ...errors, [name]: errorMessage });
  };
*/

  const handleOnChange = async ({ currentTarget: input }) => {
    //console.log("handleOnChange ..............");
    const { name, value } = input;
    //console.log(">>>>>>>>>>>>>>>>", name + "<<<>>>>" + value);

    // clear server logicError first if any
    errors["logicError"] = "";
    // validate this input value
    const errorMessage = await validateInput(input);
    // set input error if any, otherwise set it to blank
    setErrors({ ...errors, [name]: errorMessage });
    // update input value
    setValues({ ...values, [name]: value });
  };

  const validateForm = async () => {
    // form validation for all fields (client side)
    // object restructing result.error
    const options = { abortEarly: false };
    const formErrors = {};
    //console.log("validating the form .....");
    await validationSchema
      .validate(values, options)
      .then(() => {
        // success - all input data are valid
      })
      .catch((err) => {
        // collection of errors
        for (let validationError of err.inner) {
          formErrors[validationError.path] = validationError.message;
        }
      });
    // if any error, return errors otherwise return null
    console.log("form erros >>>", formErrors);
    return !isEmpty(formErrors) ? formErrors : null;
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleOnChange,
    validateForm,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(1),
    },
  },
  /*
  form: {
    width: "100%", // Fix IE 11 issue.  /// no ... will try again
    marginTop: theme.spacing(1),
  },
  */
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
