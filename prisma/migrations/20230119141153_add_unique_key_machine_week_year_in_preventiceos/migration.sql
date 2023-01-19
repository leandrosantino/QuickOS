/*
  Warnings:

  - Added the required column `data` to the `PreventiveOS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `PreventiveOS` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PreventiveOS" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "machineId" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "responsibleId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    CONSTRAINT "PreventiveOS_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreventiveOS_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Worker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PreventiveOS" ("id", "machineId", "responsibleId", "week") SELECT "id", "machineId", "responsibleId", "week" FROM "PreventiveOS";
DROP TABLE "PreventiveOS";
ALTER TABLE "new_PreventiveOS" RENAME TO "PreventiveOS";
CREATE UNIQUE INDEX "PreventiveOS_machineId_week_year_key" ON "PreventiveOS"("machineId", "week", "year");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
