import { LoaderFunction, redirect } from "@remix-run/node";
// eslint-disable-next-line import/no-unresolved
import { destroySession, getSession } from "~/services/session";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);

  // Destruir la sesión
  const cookie = await destroySession(session);

  console.log("Sesión antes de ser destruida:", session.data); // Debug
  console.log("Cookie de destrucción:", cookie); // Debug

  return redirect("/", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};
