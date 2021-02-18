import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { SIGNUP_FAIL } from "./../../redux/actions/actionTypes";
import { signUp } from "../../redux/actions/authActions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialFieldValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};
const initialErrorValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  logicError: "",
};

export const SignUp = ({ signUp, isAuthenticated, error, history }) => {
  const classes = useStyles();
  // check the list of dependency values against the values from the last render,
  // and will call your effect function if any one of them has changed
  useEffect(() => {
    if (error.id === SIGNUP_FAIL) {
      // set error from server
      setErrors(initialErrorValues);
      setErrors({ ...errors, [error.message.path]: error.message.error });
    } else {
      setErrors(initialErrorValues);
    }

    if (isAuthenticated) {
      // go to dashbaord after registered as user successfully
      history.push("/dashboard");
    }
  }, [error, isAuthenticated, history]);

  // the useState() hook allows our component to hold its own internal state
  const [errors, setErrors] = useState(initialErrorValues);
  const [signUpData, setSignUpData] = useState(initialFieldValues);

  // update local state
  const handleOnChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
  };

  // this hook allows us to access the dispatch function
  // const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // attempt to register
    signUp(signUpData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
          <Collapse in={errors.logicError ? true : false}>
            <Alert
              severity="error"
              onClose={() => {
                setErrors({ ...errors, logicError: "" });
              }}
            >
              <AlertTitle>Error</AlertTitle>
              {errors.logicError ? errors.logicError : ""}
            </Alert>
          </Collapse>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, new friends and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

// map action creator to props
const mapDispatchToProps = (dispatch) => {
  return {
    // create props called "createProject" which dispatch action created called "createProject"
    signUp: (signUpData) => dispatch(signUp(signUpData)),
  };
};

//export default connect(mapStateToProps, null)(SignUp);  // working with use dispatch
export default connect(mapStateToProps, mapDispatchToProps)(SignUp); // working
//export default connect(mapStateToProps, { signUp })(SignUp);          // working

/*  // test for empty object {}
      <div className="center red-text">
            {Object.keys(errors.msg).length === 0 &&
            errors.msg.constructor === Object ? null : (
              <p>{errors.msg}</p>
            )}
        </div>
*/
