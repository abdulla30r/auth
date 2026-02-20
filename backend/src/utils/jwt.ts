import jwt, { type SignOptions } from "jsonwebtoken";
import pool from "../db.js";

const secret = process.env.JWT_SECRET as string;
const jwtExpires = process.env.JWT_EXPIRES_IN as string;
const refreshSecret = process.env.JWT_REFRESH_SECRET as string;
const refreshExpires = process.env.JWT_REFRESH_EXPIRES_IN as string;

/* ================= ACCESS TOKEN ================= */

export const signAccessToken = async (payload: any) => jwt.sign(payload, secret, { expiresIn: jwtExpires } as SignOptions);

export const verifyAccessToken = async (token: string) => jwt.verify(token, secret);

/* ================= REFRESH TOKEN ================= */

export const signRefreshToken = async (payload: any) => {
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: refreshExpires } as SignOptions);
    await pool.query("update auth.users set refreshToken = $2 where id = $1;", [payload.id, refreshToken]);
    return refreshToken;
};

export const verifyRefreshToken = async (token: string) => {
    const payload = jwt.verify(token, refreshSecret);

    if (typeof payload !== "string" && "id" in payload) {
        const result = await pool.query("select refreshToken from auth.users where id = $1;", [payload.id]);

        console.log(result.rows[0]); 

        if (result.rows[0].refreshtoken !== token) {
            throw new Error("Refresh token has been revoked");
        }
    }
    return payload;
};