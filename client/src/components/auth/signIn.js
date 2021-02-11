import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { connect } from "react-redux";
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
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

//const useStyles = (theme) => ({});
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
const initialErrorValues = { email: "", password: "", loginError: "" };

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
      console.log("error message in client >>>", error.message);
      //setAuthError(error.message);
      setAuthError(initialErrorValues);
      setAuthError({ ...authError, [error.message.key]: error.message.error });
      console.log("authError >>>>>>> ", authError);
    } else {
      setAuthError(initialErrorValues);
    }

    if (isAuthenticated) {
      // go to dashbaord after logged in successfully
      history.push("/dashboard");
    }
  }, [error, isAuthenticated, history]);

  // the useState() hook allows our component to hold its own internal state
  //const [authError, setAuthError] = useState(null);
  const [authError, setAuthError] = useState(initialErrorValues);
  const [signInData, setSignInData] = useState(initialFieldValues);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
    setAuthError({ ...authError, [name]: "" });
  };

  const handleClickShowPassword = () => {
    setSignInData({ ...signInData, showPassword: !signInData.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // attempt to register
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
            <Collapse in={authError.loginError ? true : false}>
              <Alert
                severity="error"
                onClose={() => {
                  setAuthError({ ...authError, loginError: "" });
                }}
              >
                <AlertTitle>Error</AlertTitle>
                {authError.loginError ? authError.loginError : ""}
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
              //autoFocus
              onChange={handleOnChange}
              error={authError.email ? true : false}
              helperText={authError.email ? authError.email : ""}
            />
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <InputLabel
                htmlFor="password"
                error={authError.password ? true : false}
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
                error={authError.password ? true : false}
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
              <FormHelperText error={authError.password ? true : false}>
                {authError.password ? authError.password : ""}
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
