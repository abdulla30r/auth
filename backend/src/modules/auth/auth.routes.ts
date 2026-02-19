import express from "express";
import signup from "./signup.js";
import login from "./login.js";

const router = express.Router();

router.use("/signup", signup);
router.use("/login", login);

export default router;
