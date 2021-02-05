import React from "react";
import { connect } from "react-redux";

export const UserProfile = (props) => {
  return (
    <div>
      <h1>User Profile</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
