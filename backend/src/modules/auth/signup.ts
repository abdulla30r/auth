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
        const existing = await pool.query("SELECT 1 FROM auth.users WHERE email = $1", [email]);
        if (existing.rowCount != null && existing.rowCount > 0) {
            return res.status(409).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query("INSERT INTO auth.users (email, password) VALUES ($1, $2) RETURNING id, email", [email, hashedPassword]);
        const user = result.rows[0]!;
        const accessToken = await signAccessToken({ id: user.id });
        const refreshToken = await signRefreshToken({ id: user.id });

        return res.status(201).json({ message: "created", user, accessToken, refreshToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
    }
});

export default router;
