import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { signOut } from "../../redux/actions/authActions";

export const SignOut = (props) => {
  useEffect(() => {
    props.signOut();
    //props.history.push('/login');
  }, [props]);

  return <Redirect to="/login" />;
};

SignOut.propTypes = {
  signOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

// map state to props
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// map action creator to props
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
