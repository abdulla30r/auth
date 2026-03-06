import express from "express";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "../../utils/jwt.js";
import { findByEmail, createUser } from "../../models/user.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const existing = await findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword);

    const accessToken = await signAccessToken({ id: user.id });
    const refreshToken = await signRefreshToken({ id: user.id });

    return res.status(201).json({ message: "created", user, accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
