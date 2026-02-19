import express from "express";
import pool from "../../db.js";
import bcrypt from "bcrypt";
import { signAccessToken } from "../../utils/jwt.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const query = "select * from auth.users where email = $1;";
  try {
    const queryResult = await pool.query(query, [email]);
    if (queryResult.rowCount === 0) {
      return res.status(401).json({ error: "Wrong Credential" });
    }

    const user = queryResult.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong Credential" });
    }

    // genarate jwt
    const accessToken = signAccessToken({
      userId: user.id,
      email: user.email,
    });

    return res.status(200).json({
      message: "Login successful",
      accessToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Database error" });
  }
});

export default router;
