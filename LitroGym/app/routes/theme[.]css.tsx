import { LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "~/services/session";
import prisma from "~/db.server";
import { getTheme } from "~/services/theme";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  let userColor = "black"; // Color por defecto

  if (userId) {
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: { color: true },
    });

    userColor = userData?.color ?? "black";
  }

  const theme = getTheme(userColor);

  const data = `
  :root {
    --color-primary: ${theme.colorPrimary};
    --color-primary-light: ${theme.colorPrimaryLight};
  }
  `;

  return new Response(data, {
    headers: { "Content-Type": "text/css" },
  });
}
