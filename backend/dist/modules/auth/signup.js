import express from 'express';
const router = express.Router();
router.post('/', (req, res) => {
    res.json({ message: "signup success" });
});
export default router;
//# sourceMappingURL=signup.js.map