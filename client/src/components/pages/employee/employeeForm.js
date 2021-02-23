import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import PhoneIphoneOutlinedIcon from "@material-ui/icons/PhoneIphoneOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import * as yup from "yup";
import * as employeeService from "../../../services/employeeService";
import { useForm, Form } from "../../common/useForm";
import Controls from "../../common/controls/controls";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
  },
}));

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const initialFieldValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "",
  departmentId: "",
  hireDate: new Date(), // null
  isPermanent: false,
};

const initialErrorValues = {
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "",
  departmentId: "",
  hireDate: null,
  isPermanent: false,
};

const validationSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required").trim().min(2),
  email: yup.string().email().required("Email is required").trim(),
  mobile: yup.string().required("Mobile number is required").trim(),
  city: yup.string().required("City is required").trim(),
  gender: yup.string().required("Gender is required"),
  departmentId: yup.string().required("Please select a department"),
  hireDate: yup.date(),
  isPermanent: yup.boolean(),
});

export default function EmployeeForm() {
  const classes = useStyles();
  const {
    values,
    errors,
    setErrors,
    handleOnChange,
    validateOnBlur, // validate each field onBlur but not onChange (false)
    validateForm,
    resetForm,
  } = useForm(initialFieldValues, initialErrorValues, validationSchema, false);

  // site effect function
  useEffect(() => {}, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formErrors = await validateForm();
    setErrors(initialErrorValues); // clear all errors first
    setErrors(formErrors || {}); // if any errors caugth, set errors otherwise set {} empty object

    // if any error, stop to calling server
    if (formErrors) return;

    console.log("Attempt to submit the form >>>", values);
    // attempt to login
    //signIn(values);
    // reset form to clear all input data
    resetForm();
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controls.TextField
            label="Full Name"
            name="fullName"
            value={values.fullName}
            InputProps={{
              endAdornment: <PersonOutlineOutlinedIcon />,
              classes: {
                adornedEnd: classes.adornedEnd,
              },
            }}
            onChange={handleOnChange}
            onBlur={validateOnBlur}
            error={errors.fullName}
          ></Controls.TextField>
          <Controls.TextField
            label="Email"
            name="email"
            value={values.email}
            InputProps={{
              endAdornment: <MailOutlineOutlinedIcon />,
              classes: {
                adornedEnd: classes.adornedEnd,
              },
            }}
            onChange={handleOnChange}
            onBlur={validateOnBlur}
            error={errors.email}
          ></Controls.TextField>

          <Controls.TextField
            label="Mobile"
            name="mobile"
            value={values.mobile}
            InputProps={{
              endAdornment: <PhoneIphoneOutlinedIcon />,
              classes: {
                adornedEnd: classes.adornedEnd,
              },
            }}
            onChange={handleOnChange}
            onBlur={validateOnBlur}
            error={errors.mobile}
          ></Controls.TextField>

          <Controls.TextField
            label="City"
            name="city"
            value={values.city}
            InputProps={{
              endAdornment: <LocationOnOutlinedIcon />,
              classes: {
                adornedEnd: classes.adornedEnd,
              },
            }}
            onChange={handleOnChange}
            onBlur={validateOnBlur}
            error={errors.city}
          ></Controls.TextField>
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            label="Gender"
            name="gender"
            value={values.gender}
            onChange={handleOnChange}
            onBlur={validateOnBlur}
            error={errors.gender}
            items={genderItems}
          ></Controls.RadioGroup>
          <Controls.Select
            label="Department"
            name="departmentId"
            value={values.departmentId}
            onChange={handleOnChange}
            // onBlur={validateOnBlur} // does not work
            error={errors.departmentId}
            options={employeeService.getDepartmentCollection()}
          ></Controls.Select>
          <Controls.KeyboardDatePicker
            label="Hire Date"
            name="hireDate"
            value={values.hireDate}
            onChange={handleOnChange}
            onBlur={validateOnBlur}
            error={errors.hireDate}
          ></Controls.KeyboardDatePicker>
          <Controls.Checkbox
            label="Is Permanent?"
            name="isPermanent"
            value={values.isPermanent}
            onChange={handleOnChange}
            onBlur={validateOnBlur}
            error={errors.isPermanent}
          ></Controls.Checkbox>
          <div>
            <Controls.Button
              type="submit"
              text="Submit"
              startIcon={<SaveIcon />}
            ></Controls.Button>
            <Controls.Button
              text="Reset"
              onClick={resetForm}
              startIcon={<RotateLeftIcon />}
              className={classes.button}
            ></Controls.Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
