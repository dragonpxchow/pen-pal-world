import express from "express";
import auth from "../middleware/auth.js";
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
} from "../controllers/userProfile.js";

const router = express.Router();

router.get("/:accountId", auth, getUserProfile); // router.get("/:id" ..
router.post("/create", createUserProfile); // create user profile
router.put("/update/:accountId", updateUserProfile); // upodate user profile

export default router;
