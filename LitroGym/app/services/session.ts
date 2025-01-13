import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "user_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.SESSION_SECRET || "default_secret"], // Clave secreta para firmar la cookie
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

export const setUserEmailSession = async (
  email: string,
  response: Response
) => {
  const session = await getSession(response.headers.get("Cookie"));
  session.set("userEmail", email);
  response.headers.append("Set-Cookie", await commitSession(session));
  return response;
};

export const getUserEmailFromSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  return session.get("userEmail") || null;
};

export const destroyUserSession = async (response: Response) => {
  const session = await getSession(response.headers.get("Cookie"));
  session.unset("userEmail");
  response.headers.append("Set-Cookie", await commitSession(session));
  return response;
};
