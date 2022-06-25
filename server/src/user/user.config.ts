import { CookieOptions } from "express";

export const cookieExpiry = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const cookieConfig: CookieOptions = {
  path: "/",
  sameSite: "lax",
  maxAge: cookieExpiry,
  httpOnly: true,
};
