import { initialFieldValues } from "../../components/pages/userProfile/userProfileForm";
import {
  USER_PROFILE_LOADING,
  USER_PROFILE_LOADED,
  USER_PROFILE_ERROR,
  USER_PROFILE_CREATED,
  USER_PROFILE_UPDATED,
  USER_PROFILE_FAILED,
} from "./../actions/actionTypes";

//import { getUserProfile } from "./../actions/userProfileActions";

//const currentUserProfile = getUserProfile;
//console.log("current user pfoile *****", currentUserProfile);
const initState = {
  isLoading: false,
  isLoaded: false,
  userProfile: initialFieldValues,
  /* 
  userProfile: {
    accountId: "",
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    gender: "",
    joinReasonId: "",
    dateOfBirth: null, //new Date()
    agreeWithTC: false,
    introduction: "",
    interests: [], // "Singing", "Dacing", "Modelling" eg.. from api call
    joinMember: false,
  },
  */
};

const userProfileReducer = (userProfileState = initState, action) => {
  //console.log("userProfileReducer fire >>>>>", action);
  switch (action.type) {
    case USER_PROFILE_LOADING:
      return {
        ...userProfileState,
        isLoading: true,
        isLoaded: false,
      };

    case USER_PROFILE_LOADED:
      return {
        ...userProfileState,
        ...action.payload,
        isLoading: false,
        isLoaded: true,
      };

    case USER_PROFILE_CREATED:
    case USER_PROFILE_UPDATED:
      //console.log("created/updated action.payload >....", action.payload);
      return {
        ...userProfileState,
        ...action.payload,
        isLoading: false,
        isLoaded: true,
      };

    case USER_PROFILE_ERROR:
    case USER_PROFILE_FAILED:
      return userProfileState; // should return inital state
    //return { ...userProfileState, isLoading: false, userProfile: null };

    default:
      return userProfileState;
  }
};

export default userProfileReducer;
