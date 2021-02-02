import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from "./../actions/actionTypes";

const initState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

//{token:undefined, user:undefined}

const authReducer = (authState = initState, action) => {
  //console.log("authReducer >>>>>>>", action);
  switch (action.type) {
    case USER_LOADING:
      return {
        ...authState,
        isLoading: true,
      };
    // test user's login or not
    case USER_LOADED:
      //console.log("authReducer USET_LOADRD >>", action.payload);
      return {
        ...authState,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS:
      localStorage.setItem("token", action.payload.token);
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
      localStorage.removeItem("token");
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
