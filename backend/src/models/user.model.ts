import pool from "../db.js";

export interface User {
  id: number;
  email: string;
  password?: string;
}

export const findByEmail = async (email: string) => {
  const result = await pool.query("SELECT id, email, password FROM auth.users WHERE email = $1", [email]);
  return result.rows[0] as User | undefined;
};

export const createUser = async (email: string, hashedPassword: string) => {
  const result = await pool.query("INSERT INTO auth.users (email, password) VALUES ($1, $2) RETURNING id, email", [email, hashedPassword]);
  return result.rows[0] as User;
};

export const findById = async (id: number) => {
  const result = await pool.query("SELECT id, email FROM auth.users WHERE id = $1", [id]);
  return result.rows[0] as User | undefined;
};
