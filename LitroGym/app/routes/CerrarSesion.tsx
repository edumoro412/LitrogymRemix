import { LoaderFunction, redirect } from "@remix-run/node";
// eslint-disable-next-line import/no-unresolved
import { destroySession, getSession } from "~/services/session";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);

  const cookie = await destroySession(session);

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
