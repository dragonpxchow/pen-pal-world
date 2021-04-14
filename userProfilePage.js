import React, { useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux"; // https://react-redux.js.org/next/api/hooks#equality-comparisons-and-updates
import PageHeader from "../../common/usePageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import { Container, Paper, makeStyles } from "@material-ui/core";
import UserProfileForm from "./userProfileForm";
//import { getUserProfile } from "./../../../redux/actions/userProfileActions";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    //flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    //marginTop: theme.spacing(0),
  },
  formContent: {
    margin: theme.spacing(2, 5, 2, 5), // top, right, bottom, left
    padding: theme.spacing(2),
  },
}));

export const UserProfile = () => {
  const classes = useStyles();
  useEffect(() => {});
  /*
  const { isAuthenticated, userProfile } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userProfile: state.userProfile.userProfile,
  }));

  const dispatch = useDispatch();

  // site effect function
  useEffect(() => {
    if (isAuthenticated) dispatch(getUserProfile("bigpiggy@gmail.com"));
  }, [dispatch, isAuthenticated]);
  */
  return (
    <Container className={classes.pageContent}>
      <PageHeader
        title="User Profile - Refactoring form into tab sections"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.formContent}>
        <UserProfileForm />
      </Paper>
    </Container>
  );
};

export default UserProfile;
