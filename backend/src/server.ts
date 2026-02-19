import dotenv from "dotenv";
import pool from "./db.js";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT;

app.use("/", (req, res) => {
  res.json({ health: "Okay" });
});

app.listen(port, async () => {
  console.log(`http://localhost:${port}`);
  try {
    const res = await pool.query("SELECT NOW()"); // query returns current DB time
    console.log("Database: Connected");
  } catch (err) {
    console.error("Database: Not Connected", err);
  }
});
