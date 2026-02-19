import express from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
const router = express.Router();

router.get("/", requireAuth, (req, res) => {
  res.json({
    message: "Protected data",
    user: req.user,
  });
});

export default router;
