import express from "express";
import { createPermission, findPermissionbyName } from "../../models/permission.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    // 1. Check if permission already exists
    const existing = await findPermissionbyName(name);

    if (existing) {
      return res.status(409).json({ error: "Permission already exists" });
    }

    // 2. Insert the new permission
    const newPermission = await createPermission(name);
    return res.status(201).json({
      message: "Permission created",
      data: newPermission,
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
