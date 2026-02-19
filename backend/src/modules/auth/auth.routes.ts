import express from "express";
import signup from "./signup.js";
import login from "./login.js";
import userProfile from "./userProfile.js";

const router = express.Router();
router.use("/signup", signup);
router.use("/login", login);
router.use("/profile", userProfile);

export default router;
