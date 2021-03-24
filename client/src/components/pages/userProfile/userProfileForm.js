import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // https://react-redux.js.org/next/api/hooks#equality-comparisons-and-updates
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { useForm, Form } from "./../../common/useForm";
import { useTab, TabPanel, Tabs } from "./../../common/useTab";
import Controls from "./../../common/controls/controls";
import UserProfileInfo from "./userProfileInfo";
import UserProfileBiography from "./userProfileBiography";
//import UserProfileAccountOption from "./userPprofileAccountOption";
import UserProfileSetting from "./userProfileSetting";
import {
  getUserProfile,
  createUserProfile,
} from "./../../../redux/actions/userProfileActions";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(0.5),
  },
}));

const initialErrorValues = {
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "",
  joinReasonId: "",
  dateOfBirth: null,
  agreeWithTC: false,
  introduction: "",
  interests: "",
  joinMember: false,
};

const validationSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required").trim().min(2),
  email: yup.string().email().required("Email is required").trim(),
  mobile: yup.string().required("Mobile number is required").trim(),
  city: yup.string().required("City is required").trim(),
  gender: yup.string().required("Gender is required"),
  joinReasonId: yup.string().required("Please select a reason"),
  dateOfBirth: yup.date("Date of Birth is required"),
  agreeWithTC: yup.boolean(),
  introduction: yup
    .string()
    .required("An introducton about yourself is required"),
  interests: yup
    .array()
    .min(1, "Please select at at least one interest/hobby")
    .required(),
  joinMember: yup.boolean(),
});

export const UserProfileForm = () => {
  // use styles
  const classes = useStyles();
  const dispatch = useDispatch();

  const { isAuthenticated, userProfile } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userProfile: state.userProfile.userProfile,
  }));

  // site effect function
  useEffect(() => {
    if (isAuthenticated) dispatch(getUserProfile("bigpiggy@gmail.com"));
  }, [isAuthenticated, dispatch]);

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
  } = useForm(userProfile, initialErrorValues, validationSchema, false);
  //} = useForm(initialFieldValues, initialErrorValues, validationSchema, false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formErrors = await validateForm();
    setErrors(initialErrorValues); // clear all errors first
    setErrors(formErrors || {}); // if any errors caugth, set errors otherwise set {} empty object

    // if any error, stop to calling server
    if (formErrors) return;

    // if no error, attempt to submit
    dispatch(createUserProfile(values));

    // reset form to clear all input data
    //   resetForm();
  };

  return (
    <Grid container>
      <Tabs
        labelId="tabUserProfile"
        selectionFollowsFocus
        onChange={handleTabChange}
        value={tabValue}
        tabLabels={["User Information", "Biography", "Setting"]}
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
          <UserProfileBiography
            values={values}
            errors={errors}
            onChange={handleOnChange}
            onBlur={validateOnBlur}
          />
        </TabPanel>
        {/*
        <TabPanel value={tabValue} index={2}>
          <UserProfileAccountOption
            values={values}
            errors={errors}
            onChange={handleOnChange}
            onBlur={validateOnBlur}
          />
        </TabPanel>
        */}
        <TabPanel value={tabValue} index={2}>
          <UserProfileSetting
            values={values}
            errors={errors}
            onChange={handleOnChange}
            onBlur={validateOnBlur}
          />
        </TabPanel>

        <Box textAlign="center">
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
        </Box>
      </Form>
    </Grid>
  );
};

export default UserProfileForm;
