import _ from "lodash";
import { UserProfile, validateUserProfile } from "../models/userProfile.js";

// get user profile with his/her user account _id
export const getUserProfile = async (req, res) => {
  try {
    //console.log("getUserProfile by accountId >>>", req.params.accountId);
    //const userProfile = await UserProfile.findById(req.params.accountId).select("-__v"); // except these
    const userProfile = await UserProfile.findOne({
      accountId: req.params.accountId,
    }).select("-__v"); // except these
    //console.log("user profile >>>", userProfile);
    if (userProfile) {
      res.json({ userProfile }); // res.json({ userProfile: userProfile });
    }
  } catch (err) {
    // user profile not found
    //console.log("get error >>>>>>");
    res.status(500).json({
      name: "UserProfileError",
      path: "logicError",
      error: err.message,
    });
  }
};

export const createUserProfile = async (req, res) => {
  //console.log("Creat userProfileController c>>>>>>", req.body);
  try {
    // validate data first
    const { error } = validateUserProfile(req.body);
    if (error)
      return res.status(400).json({
        name: "ValidateUserProfileError",
        path: error.details[0].context.key, // field name
        error: error.details[0].message,
      });

    // then check for user profile existence
    let userProfile = await UserProfile.findOne({
      accountId: req.body.accountId,
    });
    if (userProfile)
      return res.status(400).json({
        name: "CreateUserProfileError",
        path: "logicError",
        error: "User Profile already created.",
      });

    // all good, then create a new user profile
    userProfile = new UserProfile(req.body);
    await userProfile.save();
    // send newly saved user profile back to client
    res.json({
      userProfile,
    });
  } catch (err) {
    res.status(500).json({
      name: "CreateUserProfileError",
      path: "logicError",
      error: err.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  //console.log("updateUserProfile by accountId >>>", req.params.accountId);
  try {
    const id = req.body._id;
    // validate data first without userProfile _id
    delete req.body._id;
    const { error } = validateUserProfile(req.body);
    if (error)
      return res.status(400).json({
        name: "ValidateUserProfileError",
        path: error.details[0].context.key, // field name
        error: error.details[0].message,
      });

    const userProfile = await UserProfile.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-__v"); // select all except these;

    /* then no need copying field values over
     {
        accountId: req.body.accountId,
        fullName: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city,
        gender: req.body.gender,
        joinReasonId: req.body.joinReasonId,
        dateOfBirth: req.body.dateOfBirth,
        agreeWithTC: req.body.agreeWithTC,
        introduction: req.body.introduction,
        interests: req.body.interests,
        joinMember: req.body.joinMember,
      }
      */
    if (!userProfile)
      return res.status(400).json({
        name: "UpdateUserProfileError",
        path: "logicError", // field name
        error: "The user with given account id was not found",
      });

    // return updated user profile
    res.json({
      userProfile,
    });
  } catch {
    res.status(500).json({
      name: "UpdateUserProfileError",
      path: "logicError",
      error: err.message,
    });
  }
};
