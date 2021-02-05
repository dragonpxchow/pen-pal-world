import React from "react";
import { connect } from "react-redux";

export const AboutUs = (props) => {
  return (
    <div>
      <h1>About US</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
