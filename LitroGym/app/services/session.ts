import { createCookieSessionStorage } from "@remix-run/node";
import { sessionCookie } from "./cookie";

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: sessionCookie,
  });
