/*
  Warnings:

  - Added the required column `musculo` to the `Ejercicio` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ejercicio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "musculo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Ejercicio" ("createdAt", "id", "nombre", "updatedAt") SELECT "createdAt", "id", "nombre", "updatedAt" FROM "Ejercicio";
DROP TABLE "Ejercicio";
ALTER TABLE "new_Ejercicio" RENAME TO "Ejercicio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
