import { SET_ERRORS, CLEAR_ERRORS } from "./actionTypes";

// SET ERRORS
export const setErrors = (msg, status, id) => {
  return {
    type: SET_ERRORS,
    payload: { msg, status, id },
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
