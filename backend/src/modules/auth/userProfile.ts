import express from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { findById } from "../../models/user.model.js";
const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const id = (req.user as any).id;
  const user = await findById(id);

  res.json({ message: "Profile", user });
});

export default router;
