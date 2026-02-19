import dotenv from "dotenv";
dotenv.config();

import pool from "./db.js";
import app from "./app.js";

const port = process.env.PORT;

app.listen(port, async () => {
  console.log(`http://localhost:${port}`);
  try {
    await pool.query("SELECT NOW()");
    console.log("Database: Connected");
  } catch (err) {
    console.error("Database: Not Connected", err);
  }
});
