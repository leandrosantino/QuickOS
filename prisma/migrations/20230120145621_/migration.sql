/*
  Warnings:

  - You are about to drop the `PeventiveActionCarriedOut` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PeventiveActionCarriedOut";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PreventiveActionTaken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "osId" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,
    "weekCode" TEXT NOT NULL,
    CONSTRAINT "PreventiveActionTaken_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "PreventiveAction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreventiveActionTaken_osId_fkey" FOREIGN KEY ("osId") REFERENCES "PreventiveOS" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
