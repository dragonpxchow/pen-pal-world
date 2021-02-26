import React from "react";
import { connect } from "react-redux";
import PageHeader from "../../common/usePageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import { Container, Paper, makeStyles } from "@material-ui/core";
import UserProfileForm from "./userProfileForm";

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

export const UserProfile = (props) => {
  const classes = useStyles();
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
