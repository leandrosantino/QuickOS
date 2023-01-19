/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PreventiveAction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "machine" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "excution" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,
    "nextExecution" INTEGER NOT NULL,
    "preventiveOSId" INTEGER,
    CONSTRAINT "PreventiveAction_preventiveOSId_fkey" FOREIGN KEY ("preventiveOSId") REFERENCES "PreventiveOS" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PreventiveOS" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "machine" TEXT NOT NULL,
    "week" INTEGER NOT NULL
);
