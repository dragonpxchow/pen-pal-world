import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import * as yup from "yup";

export function useForm(
  initialFieldValues,
  initialErrorValues,
  validationSchema,
  validateOnChange = false
) {
  const isEmpty = require("is-empty");
  // the useState() hook allows our component to hold its own internal state
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState(initialErrorValues);

  const validateInputChange = async ({ name, value }) => {
    // field validation (client side)
    // name , value is object restructing of e.curretnTarget
    //console.log("validateInputChange fire ...");
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

  const validateOnBlur = async ({ currentTarget: input }) => {
    // field validation onBlur if part of props
    //console.log("ValidationOnBlur fire ....");
    const { name } = input;
    const errorMessage = await validateInputChange(input);
    // set input error if any, otherwise set it to blank
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleOnChange = async ({ currentTarget: input }) => {
    // field validation onChange
    //console.log("handleOnChange fire ..............");
    const { name, value } = input;
    //console.log(">>>>>>>>>>>>>>>>", name + "<<<>>>>" + value);

    // clear server logicError first if any
    errors["logicError"] = "";
    // validate this input value if validateOnChange is true
    if (validateOnChange) {
      const errorMessage = await validateInputChange(input);
      // set input error if any, otherwise set it to blank
      setErrors({ ...errors, [name]: errorMessage });
    } else {
      // clear errorMessage
      setErrors({ ...errors, [name]: "" });
    }
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
    validateOnBlur,
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
