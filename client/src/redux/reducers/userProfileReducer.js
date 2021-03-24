import {
  USER_PROFILE_LOADING,
  USER_PROFILE_LOADED,
  USER_PROFILE_ERROR,
  USER_PROFILE_CREATED,
  USER_PROFILE_FAILED,
} from "./../actions/actionTypes";

const initState = {
  isLoading: false,
  isLoaded: false,
  userProfile: {
    id: 0,
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
};

const userProfileReducer = (userProfileState = initState, action) => {
  switch (action.type) {
    case USER_PROFILE_LOADING:
      return { ...userProfileState, isLoading: true, isLoaded: false };

    case USER_PROFILE_LOADED:
      return {
        ...userProfileState,
        isLoading: false,
        isLoaded: true,
        userProfile: action.payload,
      };

    case USER_PROFILE_CREATED:
      return {
        ...userProfileState,
        ...action.payload, // user profile data
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
