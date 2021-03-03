//import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import PhoneIphoneOutlinedIcon from "@material-ui/icons/PhoneIphoneOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Controls from "./../../common/controls/controls";
import { getJoinReasonCollection } from "./../../../services/joinReasonServices";

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
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <Controls.RadioGroup
            label="Gender"
            name="gender"
            value={values.gender}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.gender}
            options={genderItems}
            textOption="id"
            valueOption="title"
          ></Controls.RadioGroup>
          <Controls.Select
            label="I am a"
            name="joinReasonId"
            value={values.joinReasonId}
            onChange={onChange}
            // onBlur={onBlur} // does not work
            error={errors.joinReasonId}
            options={getJoinReasonCollection()}
            textOption="reason"
            valueOption="id"
          ></Controls.Select>
          <Controls.KeyboardDatePicker
            label="Birthday"
            name="dateOfBirth"
            value={values.dateOfBirth}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.dateOfBirth}
          ></Controls.KeyboardDatePicker>
          <Controls.Checkbox
            label="I have read and agree to the Terms and Conditions"
            name="agreeWithTC"
            value={values.agreeWithTC}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.agreeWithTC}
          ></Controls.Checkbox>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfileInfo;
