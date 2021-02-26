import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { useForm, Form } from "./../../common/useForm";
import { useTab, TabPanel, Tabs } from "./../../common/useTab";
import Controls from "./../../common/controls/controls";
import UserProfileInfo from "./userProfileInfo";
import UserProfileBio from "./userProfileBio";
import UserProfileAccountOption from "./userPprofileAccountOption";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(0.5),
  },
}));

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

export const UserProfileForm = (props) => {
  // use styles
  const classes = useStyles();

  // use tabs
  const { tabValue, handleTabChange } = useTab(0);

  // use form
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
    <Grid container>
      <Tabs
        labelId="tabUserProfile"
        selectionFollowsFocus
        onChange={handleTabChange}
        value={tabValue}
        tabLabels={["User Information", "User Biography", "Payment Options"]}
      />

      <Form onSubmit={handleOnSubmit}>
        <TabPanel value={tabValue} index={0}>
          <UserProfileInfo
            values={values}
            errors={errors}
            onChange={handleOnChange}
            onBlur={validateOnBlur}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <UserProfileBio
            values={values}
            errors={errors}
            onChange={handleOnChange}
            onBlur={validateOnBlur}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <UserProfileAccountOption
            values={values}
            errors={errors}
            onChange={handleOnChange}
            onBlur={validateOnBlur}
          />
        </TabPanel>
        <Grid item xs={6}>
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
      </Form>
    </Grid>
  );
};

UserProfileForm.propTypes = {
  //props: PropTypes,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileForm);
