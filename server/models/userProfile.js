import Joi, { string } from "joi";
import mongoose from "mongoose";

// userProfile schema definition
const userProfileSchema = new mongoose.Schema({
  accountId: { type: string, required: true }, // from user's login account _id
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  mobile: { type: String, trim: true, required: true },
  city: { type: String, trim: true, required: true },
  gender: { type: string, required: true },
  joinReasonId: { type: string, required: true },
  dateOfBirth: { type: Date, required: true },
  agreeWithTC: { type: Boolean, default: true },
  introduction: { type: string, required: true, trim: true },
  interests: { type: Array, required: true },
  joinMember: { type: Boolean, default: false },
});

// export userProfile model
export const UserProfile = mongoose.model("UserProfile", userProfileSchema);

// export userProfile validator
export const validateUserProfile = (userProfile) => {
  const schema = Joi.object({
    accountId: Joi.string().required(), // from user's login account
    fullName: Joi.string().min(2).max(255).required(),
    email: Joi.email().min(5).max(255).required(),
    mobile: Joi.string().min(10).required(),
    city: Joi.string().required(),
    gender: Joi.string().required(),
    joinReasonId: Joi.string().required(),
    dateOfBirth: Joi.date(),
    agreeWithTC: Joi.boolean(), //.invalid(false), enfore to click true
    introduction: Joi.string().required(),
    interests: Joi.array().min(1).required(),
    joinMember: Joi.boolean(),
    //fromDate: Joi.date().allow(["", null]),
    //description: Joi.string().allow(["", null]).label("Description"),
    //genreId: Joi.objectId().required(), if linked to other document
  });

  return schema.validate(userProfile);
};
