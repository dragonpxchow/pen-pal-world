import http from "../../services/httpServices";
import { setErrors, clearErrors } from "./errorAction";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SET_CURRENT_USER,
} from "./actionTypes";

// set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// check token and load user data
export const xxxxloadUser = () => async (dispatch, getState) => {
  // not in use yet
  //try {
  // User loading
  dispatch({ type: USER_LOADING });

  // same with axios.defaults.headers.common["x-auth-token"] = jwt;
  const token = getState().auth.token;
  http.setAuthToken(token); // fixing bi-directional dependencies
  //console.log("authActions loadUser token >>>>", token);
  await http
    .get("/users/me")
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((error) => {
      //console.log("authActions error >>>>>>>>", error.response);
      dispatch(setErrors(error.response.data, error.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// user signin/login
export const signIn = (signInData) => async (dispatch) => {
  //console.log("authActions signIn >>>>>>>", signInData);
  await http
    .post("/auth/login", signInData)
    .then((res) => {
      dispatch({
        type: SIGNIN_SUCCESS,
        payload: res.data,
      });
      // clear any error here
      dispatch(clearErrors());
    })
    .catch((error) => {
      //console.log("authAction expect error >>>>>>", error.response.data);
      dispatch(
        setErrors(error.response.data, error.response.status, SIGNIN_FAIL)
      );
      dispatch({
        type: SIGNIN_FAIL,
      });
    });
};

// user signout/logout
export const signOut = () => async (dispatch) => {
  try {
    //console.log("authActions signOut >>>>>>>");
    // also remove token from local storage
    dispatch({ type: SIGNOUT_SUCCESS });

    // clean any error after signout
    dispatch(clearErrors());
  } catch (error) {
    // console.log(error.message);
  }
};

// user signup/register
export const signUp = (signUpData) => async (dispatch) => {
  //console.log("authActions signUp >>>>>>>");
  await http
    .post("/users/register", signUpData)
    .then((res) => {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
      // clear any error here
      dispatch(clearErrors());
    })
    .catch((error) => {
      //console.log("authAction expect error >>>>>>", error.response.data);
      dispatch(
        setErrors(error.response.data, error.response.status, SIGNUP_FAIL)
      );
      dispatch({
        type: SIGNUP_FAIL,
      });
    });
};
