import express from "express";
import pool from "../../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    // 1. Check if permission already exists
    const existResult = await pool.query(
      "SELECT name FROM auth.permissions WHERE name = $1;",
      [name],
    );

    if (existResult.rowCount && existResult.rowCount > 0) {
      return res.status(409).json({ error: "Permission already exists" });
    }

    // 2. Insert the new permission
    const result = await pool.query(
      "INSERT INTO auth.permissions (name) VALUES ($1) RETURNING id, name;",
      [name],
    );

    return res.status(201).json({
      message: "Permission created",
      data: result.rows[0],
    });
  } catch (err) {
    // 3. Log the error for the developer and return a 500 status
    console.error("Error creating permission:", err);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
