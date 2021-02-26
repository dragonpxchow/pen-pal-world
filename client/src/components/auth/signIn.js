import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as yup from "yup";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Container,
  Collapse,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, Form } from "./../common/useForm";
import Controls from "./../common/controls/controls";
import { SIGNIN_FAIL } from "./../../redux/actions/actionTypes";
import { signIn } from "../../redux/actions/authActions";

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
    marginTop: theme.spacing(2),
  },
}));

const initialFieldValues = {
  email: "",
  password: "",
};
const initialErrorValues = { email: "", password: "", logicError: "" };

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email is required").min(5).max(255),
  password: yup
    .string()
    .required("Password id required")
    .trim()
    .min(5, "Password needs to be at least 5 characters")
    .max(1024),
  /* password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/)
    .required(
      "Please valid password. One uppercase, one lowercase, one special character and no spaces"
    ),
  */
});

export const SignIn = ({ signIn, isAuthenticated, error, history }) => {
  const classes = useStyles();
  const {
    values,
    errors,
    setErrors,
    handleOnChange,
    validateForm,
    resetForm,
  } = useForm(initialFieldValues, initialErrorValues, validationSchema, true); // validate each field onChange (true)

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
      // reset form to clear all input data
      resetForm();
      // go to default page after logged in successfully
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

    // attempt to login
    signIn(values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
                error={errors.email}
              ></Controls.TextField>
            </Grid>
            <Grid item xs={12}>
              <Controls.ShowPassword
                label="password"
                name="password"
                value={values.password}
                onChange={handleOnChange}
                error={errors.password}
              ></Controls.ShowPassword>
            </Grid>
            <Grid item xs={12}>
              <Controls.Button
                type="submit"
                text="Sign In"
                fullWidth
                endIcon={<VpnKeyOutlinedIcon />}
              ></Controls.Button>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>

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
    signIn: (values) => dispatch(signIn(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
