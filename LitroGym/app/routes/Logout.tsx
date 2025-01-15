import { LoaderFunction, redirect } from "@remix-run/node";
// eslint-disable-next-line import/no-unresolved
import { commitSession, destroySession, getSession } from "~/services/session";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeaders = request.headers.get("cookie");
  const session = await getSession(cookieHeaders);
  await destroySession(session);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
