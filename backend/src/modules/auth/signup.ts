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

  // check user exist
  const query = "select * from auth.users where email = $1;";

  try {
    const queryResult = await pool.query(query, [email]);

    if (queryResult.rowCount != null && queryResult.rowCount > 0) {
      return res.status(409).json({ error: "User already exists" });
    } else {
      const query =
        "INSERT INTO auth.users (email, password) VALUES ($1, $2) RETURNING *;";
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const queryResult = await pool.query(query, [email, hashedPassword]);
        const createdUser = queryResult.rows?.[0];

        // genarate jwt
        const accessToken = signAccessToken({
          userId: createdUser.id,
          email: createdUser.email,
        });

        return res.status(201).json({
          message: "created",
          user: { id: createdUser?.id, email: createdUser?.email },
          accessToken,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
});

export default router;
