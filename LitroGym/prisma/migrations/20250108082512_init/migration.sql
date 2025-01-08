-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Ejercicio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Rutina" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Rutina_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserEjercicio" (
    "userId" TEXT NOT NULL,
    "ejercicioId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "ejercicioId"),
    CONSTRAINT "UserEjercicio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserEjercicio_ejercicioId_fkey" FOREIGN KEY ("ejercicioId") REFERENCES "Ejercicio" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EjercicioRutinas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EjercicioRutinas_A_fkey" FOREIGN KEY ("A") REFERENCES "Ejercicio" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EjercicioRutinas_B_fkey" FOREIGN KEY ("B") REFERENCES "Rutina" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_EjercicioRutinas_AB_unique" ON "_EjercicioRutinas"("A", "B");

-- CreateIndex
CREATE INDEX "_EjercicioRutinas_B_index" ON "_EjercicioRutinas"("B");
