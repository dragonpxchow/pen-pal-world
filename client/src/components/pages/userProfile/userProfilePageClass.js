import React, { Component } from "react";
import { compose } from "redux"; // bindActionCreators
import { connect } from "react-redux";
import PageHeader from "../../common/usePageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import { Container, Paper, withStyles } from "@material-ui/core";
import UserProfileForm from "./userProfileForm";
import { getUserProfile } from "./../../../redux/actions/userProfileActions";

const useStyles = (theme) => ({
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
});

class UserProfile extends Component {
  constructor(props) {
    super(props);
    console.log("userProfilePage props", this.props);
  }
  componentDidMount() {
    console.log("in >>>>>>>> CDM");
    this.props.getUserProfile("warrent@gmail.com");
  }

  render() {
    const { classes } = this.props;
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
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    //getUserProfile: bindActionCreators(getUserProfile, dispatch),
    getUserProfile: (email) => dispatch(getUserProfile(email)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps // or put null here if you do not have actions to dispatch
  ),
  withStyles(useStyles)
)(UserProfile);
