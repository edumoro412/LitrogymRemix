-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ejercicio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "musculo" TEXT NOT NULL,
    "video" TEXT DEFAULT '',
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Ejercicio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ejercicio" ("createdAt", "id", "musculo", "nombre", "updatedAt", "video") SELECT "createdAt", "id", "musculo", "nombre", "updatedAt", "video" FROM "Ejercicio";
DROP TABLE "Ejercicio";
ALTER TABLE "new_Ejercicio" RENAME TO "Ejercicio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
