import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import { Form } from "./../common/useForm";
import { signOut } from "./../../redux/actions/authActions";

const useStyles = (theme) => ({});

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.signOut();
  };

  render() {
    const { user } = this.props.auth;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography
                    variant="h2"
                    component="h2"
                    gutterBottom
                    align="center"
                  >
                    Dashboard
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <br />
            <br />
            <br />
            <Grid container>
              <Grid item xs />
              <Grid item xs={8}>
                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  align="center"
                >
                  <b>Hey there,</b> {user.firstName + " " + user.lastName}
                </Typography>
                <Typography align="center">
                  You are logged into a full-stack{" "}
                  <span style={{ fontFamily: "monospace" }}>Friend</span> app 👏
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                    }}
                    onClick={this.onLogoutClick}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Logout
                  </Button>
                </Box>
              </Grid>
              <Grid item xs />
            </Grid>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  signOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signOut })(
  withStyles(useStyles)(Dashboard)
);
