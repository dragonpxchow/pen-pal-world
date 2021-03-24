import _ from "lodash";

// get user profile with his/her user account _id
export const getUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.params.id).select(
      "-__v"
    ); // except these
    if (userProfile) return res.json(userProfile);
  } catch (err) {
    // user profile not found
    res.status(500).json({
      name: "UserProfileLoginError",
      path: "logicError",
      error: err.message,
    });
  }
};

export const createUserProfile = async (req, res) => {
  // try to return something for testing
  res.json({ fullName: "Warren Chow", email: "warrenchow@gmail.com" });
};
export const updateUserProfile = async (req, res) => {
  res.json({ userProfile: "update user profile successfully" });
};
