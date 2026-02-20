import express from "express";
import { verifyRefreshToken, signAccessToken, signRefreshToken } from "../../utils/jwt.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "Refresh token required" });

    try {
        const payload = (await verifyRefreshToken(refreshToken)) as any;

        const accessToken = await signAccessToken({ id: payload.id });
        const newRefreshToken = await signRefreshToken({ id: payload.id });

        return res.json({ accessToken, refreshToken: newRefreshToken });
    } catch (err) {
        return res.status(401).json({ error: "Invalid refresh token" });
    }
});

export default router;
