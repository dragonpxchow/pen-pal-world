import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userProfileReducer from "./userProfileReducer";
import errorReducer from "./errorReducer";

//export default combineReducers({ properties: properties });

export default combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
  error: errorReducer,
});
