import express from 'express';
const router = express.Router();
router.post('/', (req, res) => {
    res.json({ message: "Login success" });
});
export default router;
//# sourceMappingURL=login.js.map