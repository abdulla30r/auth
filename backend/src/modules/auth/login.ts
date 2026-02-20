import express from "express";
import pool from "../../db.js";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "../../utils/jwt.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    try {
        const result = await pool.query("SELECT * FROM auth.users WHERE email = $1", [email]);
        const user = result.rows[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Wrong credentials" });
        }

        const accessToken = await signAccessToken({ id: user.id });
        const refreshToken = await signRefreshToken({ id: user.id });

        return res.status(200).json({ message: "Login successful", accessToken, refreshToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
