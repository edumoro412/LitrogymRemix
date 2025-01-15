// eslint-disable-next-line import/no-unresolved
import db from "~/db.server";

export function todosEjercicios(query: string | null) {
  const lowerCaseQuery = query?.toLowerCase() ?? "";

  return db.ejercicio.findMany({
    where: {
      OR: [
        {
          nombre: {
            contains: lowerCaseQuery,
          },
        },
        {
          musculo: {
            contains: lowerCaseQuery,
          },
        },
      ],
    },
    orderBy: {
      nombre: "asc",
    },
  });
}
