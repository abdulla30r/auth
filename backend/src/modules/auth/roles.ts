import express from "express";
import pool from "../../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    // 1. Check if role already exists
    const existResult = await pool.query(
      "SELECT name FROM auth.roles WHERE name = $1",
      [name],
    );

    if (existResult.rowCount && existResult.rowCount > 0) {
      return res.status(409).json({ error: "Role already exists" });
    }

    // 2. Insert the new role
    const result = await pool.query(
      "INSERT INTO auth.roles(name) VALUES ($1) RETURNING id, name",
      [name],
    );

    return res.status(201).json({
      message: "Role Created Successfully",
      data: result.rows[0],
    });
  } catch (err) {
    // 3. Centralized error handling
    console.error("Database error in POST /roles:", err);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
