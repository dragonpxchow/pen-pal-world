import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../common/useForm";
import Controls from "../../common/controls/controls";
import * as employeeService from "../../../services/employeeService";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import * as yup from "yup";
import { setErrors } from "./../../../redux/actions/errorAction";

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

export default function EmployeeForm() {
  const validationSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required").trim(),
    email: yup.string().email().required("Email is required").trim(),
    mobile: yup.string().required("Mobile number is required").trim(),
    city: yup.string().required("City is required").trim(),
    gender: yup.string().required("Gender is required"),
    departmentId: yup.string().required("Please select a department"),
    hireDate: yup.date(),
    isPermanent: yup.boolean(),
  });

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleOnChange,
    validateForm,
    resetForm,
  } = useForm(initialFieldValues, initialErrorValues, validationSchema);

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
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.TextField
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onChange={handleOnChange}
            error={errors.fullName}
          ></Controls.TextField>
          <Controls.TextField
            label="Email"
            name="email"
            value={values.email}
            onChange={handleOnChange}
            error={errors.email}
          ></Controls.TextField>
          <Controls.TextField
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleOnChange}
            error={errors.mobile}
          ></Controls.TextField>
          <Controls.TextField
            label="City"
            name="city"
            value={values.city}
            onChange={handleOnChange}
            error={errors.city}
          ></Controls.TextField>
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            label="Gender"
            name="gender"
            value={values.gender}
            onChange={handleOnChange}
            error={errors.gender}
            items={genderItems}
          ></Controls.RadioGroup>
          <Controls.Select
            label="Department"
            name="departmentId"
            value={values.departmentId}
            onChange={handleOnChange}
            error={errors.departmentId}
            options={employeeService.getDepartmentCollection()}
          ></Controls.Select>
          <Controls.KeyboardDatePicker
            label="Hire Date"
            name="hireDate"
            value={values.hireDate}
            onChange={handleOnChange}
            error={errors.hireDate}
          ></Controls.KeyboardDatePicker>
          <Controls.Checkbox
            label="Is Permanent?"
            name="isPermanent"
            value={values.isPermanent}
            onChange={handleOnChange}
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
            ></Controls.Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
