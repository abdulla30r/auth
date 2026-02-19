import jwt, { type SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const signAccessToken = (payload: object) => {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || "15m") as StringValue,
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
