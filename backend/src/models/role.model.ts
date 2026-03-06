import pool from "../db.js";

export interface Role {
  id: number;
  name: string;
}

export const findRolebyName = async (name: string) => {
  const result = await pool.query("SELECT name FROM auth.roles WHERE name = $1", [name]);
  return result.rows[0] as Role | undefined;
};

export const createRole = async (name: string) => {
  const result = await pool.query("INSERT INTO auth.roles(name) VALUES ($1) RETURNING id, name", [name]);
  return result.rows[0] as Role;
};
