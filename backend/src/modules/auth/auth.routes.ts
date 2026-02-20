import express from "express";
import signup from "./signup.js";
import login from "./login.js";
import userProfile from "./userProfile.js";
import roles from "./roles.js";
import permissions from "./permissions.js";

const router = express.Router();
router.use("/signup", signup);
router.use("/login", login);
router.use("/profile", userProfile);

router.use("/role", roles);
router.use("/permission", permissions);

export default router;
