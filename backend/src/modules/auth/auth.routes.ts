import express from "express";
import signup from "./signup.js";
import login from "./login.js";
import userProfile from "./userProfile.js";
import role from "./role.js";
import permission from "./permission.js";
import refresh from "./refresh.js";

const router = express.Router();
router.use("/signup", signup);
router.use("/login", login);
router.use("/profile", userProfile);
router.use("/refresh", refresh);

router.use("/role", role);
router.use("/permission", permission);

export default router;
