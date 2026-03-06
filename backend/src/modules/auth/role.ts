import express from "express";
import { createRole, findRolebyName } from "../../models/role.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const exist = await findRolebyName(name);
    if (exist) return res.status(409).json({ error: "Role already exists" });

    const newRole = await createRole(name);
    return res.status(201).json({
      message: "Role Created Successfully",
      data: newRole,
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
