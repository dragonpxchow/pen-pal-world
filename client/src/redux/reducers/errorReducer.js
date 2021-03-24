import { SET_ERRORS, CLEAR_ERRORS } from "./../actions/actionTypes";

const initState = {
  message: {},
  status: null,
  id: null,
};

const errorReducer = (errorState = initState, action) => {
  //console.log("errorReducer fire >>>>>>>> ", action);
  switch (action.type) {
    case SET_ERRORS:
      return {
        message: action.payload.msg, // {name:"name of error", error:"message of error"}
        status: action.payload.status,
        id: action.payload.id,
      };

    case CLEAR_ERRORS:
      return {
        message: {},
        status: null,
        id: null,
      };

    default:
      return errorState;
  }
};

export default errorReducer;
