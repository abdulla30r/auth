import jwt, { type SignOptions } from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

export const signAccessToken = (payload: object) =>
  jwt.sign(payload, secret, { expiresIn: "15m" });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, secret);
