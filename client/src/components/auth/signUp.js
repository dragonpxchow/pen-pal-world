import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as yup from "yup";
import { Alert, AlertTitle } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import VpnLockOutlinedIcon from "@material-ui/icons/VpnLockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Checkbox,
  Collapse,
  Container,
  FormControlLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, Form } from "./../common/useForm";
import Controls from "./../common/controls/controls";
import { SIGNUP_FAIL } from "./../../redux/actions/actionTypes";
import { signUp } from "../../redux/actions/authActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //textAlign: "center",
    //color: theme.palette.text.secondary,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
}));

const initialFieldValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};
const initialErrorValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  logicError: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required().min(2).max(50),
  lastName: yup.string().required().min(2).max(50),
  email: yup.string().email().required("Email is required").min(5).max(255),
  password: yup
    .string()
    .required("New Password id required")
    .trim()
    .min(5, "Password needs to be at least 5 characters")
    .max(1024),

  passwordConfirmation: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords does not match"),
});

export const SignUp = ({ signUp, isAuthenticated, error, history }) => {
  const classes = useStyles();
  const {
    values,
    errors,
    setErrors,
    handleOnChange,
    validateOnBlur, // validate each field onBlur but not onChange (false)
    validateForm,
    resetForm,
  } = useForm(initialFieldValues, initialErrorValues, validationSchema, false);

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
      // reset form to clear all input data
      resetForm();
      // go to dashbaord after registered as user successfully
      history.push("/dashboard");
    }
  }, [error, isAuthenticated, history]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formErrors = await validateForm();
    setErrors(initialErrorValues); // clear all errors first
    setErrors(formErrors || {}); // if any errors caugth, set errors otherwise set {} empty object

    // if found any error, stop submitting the form
    if (formErrors) return;

    // attempt to register
    const { passwordConfirmation, ...signUpValues } = values; // remove passwordConfirmation
    signUp(signUpValues);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Form className={classes.form} onSubmit={handleOnSubmit}>
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
              <Controls.TextField
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleOnChange}
                onBlur={validateOnBlur}
                error={errors.firstName}
              ></Controls.TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controls.TextField
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleOnChange}
                onBlur={validateOnBlur}
                error={errors.lastName}
              ></Controls.TextField>
            </Grid>
            <Grid item xs={12}>
              <Controls.TextField
                label="Email"
                name="email"
                value={values.email}
                InputProps={{
                  endAdornment: <MailOutlineOutlinedIcon />,
                  classes: {
                    adornedEnd: classes.adornedEnd,
                  },
                }}
                onChange={handleOnChange}
                onBlur={validateOnBlur}
                error={errors.email}
              ></Controls.TextField>
            </Grid>
            <Grid item xs={12}>
              <Controls.TextField
                label="Password"
                name="password"
                type="password"
                value={values.password}
                InputProps={{
                  endAdornment: <VpnLockOutlinedIcon />,
                  classes: {
                    adornedEnd: classes.adornedEnd,
                  },
                }}
                onChange={handleOnChange}
                onBlur={validateOnBlur}
                error={errors.password}
              ></Controls.TextField>
            </Grid>
            <Grid item xs={12}>
              <Controls.TextField
                label="Verify New Password"
                name="passwordConfirmation"
                type="password"
                value={values.passwordConfirmation}
                InputProps={{
                  endAdornment: <VpnLockOutlinedIcon />,
                  classes: {
                    adornedEnd: classes.adornedEnd,
                  },
                }}
                onChange={handleOnChange}
                // onBlur={validateOnBlur}  can be done with special coding
                error={errors.passwordConfirmation}
              ></Controls.TextField>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, new friends and updates via email."
              />
            </Grid>
            <Grid item xs={12}>
              <Controls.Button
                type="submit"
                text="Sign Up"
                fullWidth
                endIcon={<VpnKeyOutlinedIcon />}
              ></Controls.Button>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>

          <Grid container item direction="column" alignItems="flex-end">
            <Grid item xs>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Form>
      </div>
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
    signUp: (values) => dispatch(signUp(values)),
  };
};

//export default connect(mapStateToProps, null)(SignUp);  // working with useDispatch
export default connect(mapStateToProps, mapDispatchToProps)(SignUp); // working
//export default connect(mapStateToProps, { signUp })(SignUp);          // working
