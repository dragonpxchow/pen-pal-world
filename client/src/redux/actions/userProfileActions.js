import http from "../../services/httpServices";
import { setAuthToken } from "./../../common/utils";
import { setErrors, clearErrors } from "./errorAction";
import {
  USER_PROFILE_LOADING,
  USER_PROFILE_LOADED,
  USER_PROFILE_ERROR,
  USER_PROFILE_CREATED,
  USER_PROFILE_UPDATED,
  USER_PROFILE_FAILED,
} from "./../actions/actionTypes";

//import { setErrors, clearErrors } from "./errorAction";

// check token and load user data
export const getUserProfile = () => async (dispatch, getState) => {
  dispatch({ type: USER_PROFILE_LOADING });

  // same with axios.defaults.headers.common["x-auth-token"] = jwt;
  const token = getState().auth.token;
  const userId = getState().auth.user._id;
  setAuthToken(token); // fixing bi-directional dependencies

  await http
    .get(`/userProfile/${userId}`)
    .then((res) => {
      //console.log("Actions - getUserProfile loaded successfully ...");
      dispatch({
        type: USER_PROFILE_LOADED,
        payload: res.data,
      });
      // clear any error here
      dispatch(clearErrors());
    })
    .catch((error) => {
      //console.log("Actions - getUserProfile error >>>>>>>>>>>", error.response);
      dispatch(setErrors(error.response.data, error.response.status));
      dispatch({
        type: USER_PROFILE_ERROR,
      });
    });
};

// create user profile if not existed
export const createUserProfile = (userProfileData) => async (
  dispatch,
  getState
) => {
  await http
    .post("/userProfile/create", {
      ...userProfileData,
      accountId: getState().auth.user._id, // accountId in userProfile
    })
    .then((res) => {
      dispatch({
        type: USER_PROFILE_CREATED,
        payload: res.data,
      });
      // clear any error here
      dispatch(clearErrors());
    })
    .catch((error) => {
      //console.log("createUserProfile expect error >>>>>>", error.response.data);
      dispatch(
        setErrors(
          error.response.data,
          error.response.status,
          USER_PROFILE_FAILED
        )
      );
      dispatch({
        type: USER_PROFILE_FAILED,
      });
    });
};

export const updateUserProfile = (userProfileData) => async (
  dispatch,
  getState
) => {
  //console.log("update userProfile action ........");
  await http
    .put(`/userProfile/update/${userProfileData.accountId}`, userProfileData)
    .then((res) => {
      dispatch({
        type: USER_PROFILE_UPDATED,
        payload: res.data,
      });
      // clear any error here
      dispatch(clearErrors());
    })
    .catch((error) => {
      //console.log("updateUserProfile expect error >>>>>>", error.response.data);
      dispatch(
        setErrors(
          error.response.data,
          error.response.status,
          USER_PROFILE_FAILED
        )
      );
      dispatch({
        type: USER_PROFILE_FAILED,
      });
    });
};

export const getMoviesDiscover = (name, page) => async (dispatch, getState) => {
  //console.log("OK !");
  dispatch({ type: "FETCH_MOVIES_LOADING" });
  const res = await http.get(
    `https://api.themoviedb.org/3/movie/${name}?api_key=<MY_API_KEY>`,
    {
      params: {
        page,
      },
    }
  );
  await dispatch({
    type: "FETCH_MOVIES_DISCOVER",
    payload: res.data,
  });
  dispatch({ type: "FETCH_MOVIES_FINISHED" });
};

//export const updateUserProfile = (signInData) => async (dispatch) => {};
