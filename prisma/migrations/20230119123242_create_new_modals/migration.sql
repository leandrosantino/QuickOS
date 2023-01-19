/*
  Warnings:

  - You are about to drop the column `machine` on the `PreventiveAction` table. All the data in the column will be lost.
  - You are about to drop the column `machine` on the `PreventiveOS` table. All the data in the column will be lost.
  - Added the required column `machineId` to the `PreventiveAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `machineId` to the `PreventiveOS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsibleId` to the `PreventiveOS` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Machine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tag" TEXT NOT NULL,
    "ute" TEXT NOT NULL,
    "technology" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Worker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "registration" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "class" TEXT NOT NULL
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
    CONSTRAINT "PreventiveAction_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreventiveAction_preventiveOSId_fkey" FOREIGN KEY ("preventiveOSId") REFERENCES "PreventiveOS" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PreventiveAction" ("description", "excution", "frequency", "id", "nextExecution", "preventiveOSId") SELECT "description", "excution", "frequency", "id", "nextExecution", "preventiveOSId" FROM "PreventiveAction";
DROP TABLE "PreventiveAction";
ALTER TABLE "new_PreventiveAction" RENAME TO "PreventiveAction";
CREATE TABLE "new_PreventiveOS" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "machineId" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "responsibleId" INTEGER NOT NULL,
    CONSTRAINT "PreventiveOS_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreventiveOS_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Worker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PreventiveOS" ("id", "week") SELECT "id", "week" FROM "PreventiveOS";
DROP TABLE "PreventiveOS";
ALTER TABLE "new_PreventiveOS" RENAME TO "PreventiveOS";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Machine_tag_key" ON "Machine"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "Worker_registration_key" ON "Worker"("registration");
