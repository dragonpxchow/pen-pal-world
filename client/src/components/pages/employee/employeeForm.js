import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../common/useForm";
import Controls from "../../common/controls/controls";
import * as employeeService from "../../../services/employeeService";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

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
  gender: "Male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

export default function EmployeeForm() {
  const { values, setValues, handleInputChange } = useForm(initialFieldValues);

  // site effect function
  useEffect(() => {}, []);

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Controls.TextField
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onChange={handleInputChange}
          ></Controls.TextField>
          <Controls.TextField
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          ></Controls.TextField>
          <Controls.TextField
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
          ></Controls.TextField>
          <Controls.TextField
            label="City"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          ></Controls.TextField>
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            label="Gender"
            name="gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          ></Controls.RadioGroup>
          <Controls.Select
            label="Department"
            name="departmentId"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
          ></Controls.Select>
          <Controls.DatePicker
            label="Hire Date"
            name="hireDate"
            value={values.hireDate}
            onChange={handleInputChange}
          ></Controls.DatePicker>
          <Controls.Checkbox
            label="Is Permanent?"
            name="isPermanent"
            value={values.isPermanent}
            onChange={handleInputChange}
          ></Controls.Checkbox>
          <div>
            <Controls.Button
              type="submit"
              text="Submit"
              startIcon={<SaveIcon />}
            ></Controls.Button>
            <Controls.Button
              text="Reset"
              startIcon={<RotateLeftIcon />}
            ></Controls.Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
