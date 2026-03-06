import express from "express";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "../../utils/jwt.js";
import { findByEmail } from "../../models/user.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const user = await findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password!))) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const accessToken = await signAccessToken({ id: user.id });
    const refreshToken = await signRefreshToken({ id: user.id });

    return res.status(200).json({ message: "Login successful", accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
