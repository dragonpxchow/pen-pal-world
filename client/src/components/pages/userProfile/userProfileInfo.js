//import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import PhoneIphoneOutlinedIcon from "@material-ui/icons/PhoneIphoneOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import * as employeeService from "../../../services/employeeService";
import Controls from "./../../common/controls/controls";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const UserProfileInfo = (props) => {
  const classes = useStyles();
  const { values, errors, onChange, onBlur } = props;
  return (
    <Grid container spacing={10}>
      <Grid item xs={5}>
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
          onChange={onChange}
          onBlur={onBlur}
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
          onChange={onChange}
          onBlur={onBlur}
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
          onChange={onChange}
          onBlur={onBlur}
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
          onChange={onChange}
          onBlur={onBlur}
          error={errors.city}
        ></Controls.TextField>
      </Grid>
      <Grid item xs={5}>
        <Controls.RadioGroup
          label="Gender"
          name="gender"
          value={values.gender}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.gender}
          items={genderItems}
        ></Controls.RadioGroup>
        <Controls.Select
          label="Department"
          name="departmentId"
          value={values.departmentId}
          onChange={onChange}
          // onBlur={onBlur} // does not work
          error={errors.departmentId}
          options={employeeService.getDepartmentCollection()}
        ></Controls.Select>
        <Controls.KeyboardDatePicker
          label="Hire Date"
          name="hireDate"
          value={values.hireDate}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.hireDate}
        ></Controls.KeyboardDatePicker>
        <Controls.Checkbox
          label="Is Permanent?"
          name="isPermanent"
          value={values.isPermanent}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.isPermanent}
        ></Controls.Checkbox>
      </Grid>
    </Grid>
  );
};

export default UserProfileInfo;
