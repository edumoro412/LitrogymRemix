import { createCookie } from "@remix-run/node";

if (!process.env.AUTH_COOKIE_SECRET) {
  throw new Error("AUTH_COOKIE_SECRET must be set");
}
export const sessionCookie = createCookie("session_cookie", {
  secrets: [process.env.AUTH_COOKIE_SECRET],
  httpOnly: true,
  secure: true,
});

export const themeCookie = createCookie("LitroGym__theme");
