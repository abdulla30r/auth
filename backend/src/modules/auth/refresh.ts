import express, { type CookieOptions } from "express";
import { verifyRefreshToken, signAccessToken, signRefreshToken } from "../../utils/jwt.js";
import { findById } from "../../models/user.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

  try {
    const payload = (await verifyRefreshToken(refreshToken)) as any;
    const user = await findById(payload.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    const accessToken = await signAccessToken({ id: payload.id });
    const newRefreshToken = await signRefreshToken({ id: payload.id });

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: Number(process.env.COOKIE_MAX_AGE) * 1000,
    };

    return res.status(201).cookie("refreshToken", newRefreshToken, cookieOptions).json({ message: "Token Refreshed", accessToken, email: user.email });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});

export default router;
