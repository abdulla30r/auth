import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';
dotenv.config();
const app = express();
const port = process.env.PORT;
app.listen(port, async () => {
    console.log(`Listening on port ${port}`);
    try {
        const res = await pool.query('SELECT NOW()'); // query returns current DB time
        console.log('Database connected');
        console.log('Current time:', res.rows[0].now); // print the time
    }
    catch (err) {
        console.error('Database connection failed:', err);
    }
});
//# sourceMappingURL=server.js.map