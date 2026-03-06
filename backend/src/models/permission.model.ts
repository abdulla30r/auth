import pool from "../db.js";

export interface Permission {
  id: number;
  name: string;
}

export const findPermissionbyName = async (name: string) => {
  const result = await pool.query("SELECT name FROM auth.permissions WHERE name = $1;", [name]);
  return result.rows[0] as Permission | undefined;
};

export const createPermission = async (name: string) => {
  const result = await pool.query("INSERT INTO auth.permissions (name) VALUES ($1) RETURNING id, name;", [name]);
  return result.rows[0] as Permission;
};
