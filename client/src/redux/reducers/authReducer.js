import { tokenKey } from "../../common/constants";
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
} from "./../actions/actionTypes";

const isEmpty = require("is-empty");
const initState = {
  token: localStorage.getItem(tokenKey),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const authReducer = (authState = initState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...authState,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };

    case USER_LOADING:
      return {
        ...authState,
        isLoading: true,
      };
    // test user's login or not
    case USER_LOADED:
      return {
        ...authState,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS:
      localStorage.setItem(tokenKey, action.payload.token);
      return {
        ...authState,
        ...action.payload, // token + user data
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case SIGNIN_FAIL:
    case SIGNOUT_SUCCESS:
    case SIGNUP_FAIL:
      localStorage.removeItem(tokenKey);
      return {
        ...authState,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return authState;
  }
};

export default authReducer;
