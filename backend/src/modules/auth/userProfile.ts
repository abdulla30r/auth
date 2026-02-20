import express from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import pool from "../../db.js";
const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const userId = (req.user as any).userId;
  const result = await pool.query(
    "select id,email from auth.users where id = $1;",
    [userId],
  );
  const user = result.rows[0];

  res.json({ message: "Profile", user });
});

export default router;