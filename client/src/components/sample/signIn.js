import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { connect } from "react-redux";
import * as yup from "yup";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Box,
  Container,
  Collapse,
  CssBaseline,
  Checkbox,
  Grid,
  IconButton,
  TextField,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@material-ui/core";

import { SIGNIN_FAIL } from "./../../redux/actions/actionTypes";
import { signIn } from "../../redux/actions/authActions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        this Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const isEmpty = require("is-empty");

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
  textField: {
    width: "100%",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialFieldValues = {
  email: "",
  password: "",
  showPassword: false, // will be removed when submit
};
const initialErrorValues = { email: "", password: "", logicError: "" };

export const SignIn = ({ signIn, isAuthenticated, error, history }) => {
  const classes = useStyles();

  // check the list of dependency values against the values from the last render,
  // and will call your effect function if any one of them has changed
  useEffect(() => {
    /*
    console.log(
      "Signup fire useEffect .................isAuthenticated .............",
      isAuthenticated
    );
    */
    if (error.id === SIGNIN_FAIL) {
      // set error from server
      setErrors(initialErrorValues);
      setErrors({ ...errors, [error.message.path]: error.message.error });
    } else {
      setErrors(initialErrorValues);
    }

    if (isAuthenticated) {
      // go to default page after logged in successfully
      history.push("/dashboard");
    }
  }, [error, isAuthenticated, history]);

  // the useState() hook allows our component to hold its own internal state
  //const [errors, setErrors] = useState(null);
  const [errors, setErrors] = useState(initialErrorValues);
  const [signInData, setSignInData] = useState(initialFieldValues);

  const handleClickShowPassword = () => {
    setSignInData({ ...signInData, showPassword: !signInData.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signInValidationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password id required")
      .trim()
      .min(8, "Password needs to be at least 8 characters"),
    showPassword: yup.string().notRequired(),
  });

  const validateInput = async ({ name, value }) => {
    // field validation (client side)
    // name , value is object restructing of e.curretnTarget
    // field validation
    let inputError = "";
    const options = { abortEarly: true }; // validating one field only

    await yup
      .reach(signInValidationSchema, name)
      .validate(value, options)
      .then(() => {
        // no error
        inputError = "";
      })
      .catch((error) => {
        // got error
        inputError = error.message;
      });
    return inputError;
  };

  const handleOnBlur = async ({ currentTarget: input }) => {
    // field validation on blur but not in used (client side)
    // input is e.currentTarget
    // eg.  input.name === username

    const { name, value } = input;
    const errorMessage = await validateInput(input);
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleOnChange = async ({ currentTarget: input }) => {
    const { name, value } = input;
    // clear server logicError first if any
    errors["logicError"] = "";
    // validate this input value
    const errorMessage = await validateInput(input);
    // show input error if any, otherwise set it to blank
    setErrors({ ...errors, [name]: errorMessage });
    // update input value
    setSignInData({ ...signInData, [name]: value });
  };

  const validateForm = async () => {
    // form validation for all fields (client side)
    // object restructing result.error
    const options = { abortEarly: false };
    const formErrors = {};
    await signInValidationSchema
      .validate(signInData, options)
      .then(() => {
        // success - all input data are valid
      })
      .catch((err) => {
        // collection of errors
        for (let validationError of err.inner) {
          formErrors[validationError.path] = validationError.message;
        }
      });
    // if any error, return errors otherwise return null
    return !isEmpty(formErrors) ? formErrors : null;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formErrors = await validateForm();
    setErrors(initialErrorValues); // clear all errors first
    setErrors(formErrors || {}); // if any errors caugth, set errors otherwise set {} empty object

    // if any error, stop to calling server
    if (formErrors) return;

    // attempt to login
    const { showPassword, ...signInValues } = signInData; // remove showPassword property
    signIn(signInValues);
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleOnChange}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email : ""}
            />
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <InputLabel
                htmlFor="password"
                error={errors.password ? true : false}
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                label="Your Password"
                type={signInData.showPassword ? "text" : "password"}
                value={signInData.password}
                onChange={handleOnChange}
                error={errors.password ? true : false}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {signInData.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
              <FormHelperText error={errors.password ? true : false}>
                {errors.password ? errors.password : ""}
              </FormHelperText>
            </FormControl>
            {/*
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleOnChange}
            />
        */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
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
    signIn: (signInData) => dispatch(signIn(signInData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
