import { PrismaClient } from "@prisma/client";

interface CostumNodeJSGlobal extends NodeJS.Global {
  db: PrismaClient;
}

declare const global: CostumNodeJSGlobal;

const db = global.db || new PrismaClient();
if (process.env.NODE_ENV === "development") global.db = db;
export default db;
