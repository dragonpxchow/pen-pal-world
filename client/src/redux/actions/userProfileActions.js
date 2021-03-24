import http from "../../services/httpServices";
import { getCurrentUser, setAuthToken } from "./../../common/utils";
import { setErrors, clearErrors } from "./errorAction";
import {
  USER_PROFILE_LOADING,
  USER_PROFILE_LOADED,
  USER_PROFILE_ERROR,
  USER_PROFILE_CREATED,
  USER_PROFILE_FAILED,
} from "./../actions/actionTypes";

//import { setErrors, clearErrors } from "./errorAction";

// check token and load user data
export const getUserProfile = () => async (dispatch, getState) => {
  dispatch({ type: USER_PROFILE_LOADING });

  // same with axios.defaults.headers.common["x-auth-token"] = jwt;
  const token = getState().auth.token;
  setAuthToken(token); // fixing bi-directional dependencies
  // get user data from token
  const user = getCurrentUser();

  await http
    .get(`/userProfile/${user._id}`)
    .then((res) => {
      dispatch({
        type: USER_PROFILE_LOADED,
        payload: res.data,
      });
      // clear any error here
      dispatch(clearErrors());
    })
    .catch((error) => {
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
    .post("/userProfile/create", userProfileData)
    .then((res) => {
      dispatch({
        type: USER_PROFILE_CREATED,
        payload: res.data,
      });
      // clear any error here
      dispatch(clearErrors());
    })
    .catch((error) => {
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
