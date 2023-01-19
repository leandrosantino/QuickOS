/*
  Warnings:

  - Added the required column `natureId` to the `PreventiveAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `natureId` to the `PreventiveOS` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Nature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PreventiveAction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "machineId" INTEGER NOT NULL,
    "excution" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,
    "nextExecution" INTEGER NOT NULL,
    "preventiveOSId" INTEGER,
    "natureId" INTEGER NOT NULL,
    CONSTRAINT "PreventiveAction_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreventiveAction_preventiveOSId_fkey" FOREIGN KEY ("preventiveOSId") REFERENCES "PreventiveOS" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PreventiveAction_natureId_fkey" FOREIGN KEY ("natureId") REFERENCES "Nature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PreventiveAction" ("description", "excution", "frequency", "id", "machineId", "nextExecution", "preventiveOSId") SELECT "description", "excution", "frequency", "id", "machineId", "nextExecution", "preventiveOSId" FROM "PreventiveAction";
DROP TABLE "PreventiveAction";
ALTER TABLE "new_PreventiveAction" RENAME TO "PreventiveAction";
CREATE TABLE "new_PreventiveOS" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "machineId" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "responsibleId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "natureId" INTEGER NOT NULL,
    CONSTRAINT "PreventiveOS_natureId_fkey" FOREIGN KEY ("natureId") REFERENCES "Nature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreventiveOS_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreventiveOS_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Worker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PreventiveOS" ("data", "id", "machineId", "responsibleId", "week", "year") SELECT "data", "id", "machineId", "responsibleId", "week", "year" FROM "PreventiveOS";
DROP TABLE "PreventiveOS";
ALTER TABLE "new_PreventiveOS" RENAME TO "PreventiveOS";
CREATE UNIQUE INDEX "PreventiveOS_machineId_natureId_week_year_key" ON "PreventiveOS"("machineId", "natureId", "week", "year");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
