import express from "express";
import dotenv from "dotenv";
import pool from "./db.js";
import authApi from "./modules/auth/auth.routes.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
// mount routers
app.use("/auth", authApi);
app.use("/", (req, res) => {
    res.json({ health: "Okay" });
});
app.listen(port, async () => {
    console.log(`http://localhost:${port}`);
    try {
        const res = await pool.query("SELECT NOW()"); // query returns current DB time
        console.log("Database: Connected");
    }
    catch (err) {
        console.error("Database: Not Connected", err);
    }
});
//# sourceMappingURL=server.js.map