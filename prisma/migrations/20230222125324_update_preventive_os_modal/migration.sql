/*
  Warnings:

  - You are about to drop the column `responsibleId` on the `PreventiveOS` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_PreventiveOSToWorker" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PreventiveOSToWorker_A_fkey" FOREIGN KEY ("A") REFERENCES "PreventiveOS" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PreventiveOSToWorker_B_fkey" FOREIGN KEY ("B") REFERENCES "Worker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PreventiveOS" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "machineId" INTEGER NOT NULL,
    "weekCode" TEXT NOT NULL,
    "date" DATETIME,
    "natureId" INTEGER NOT NULL,
    "actionsUniqueKey" TEXT NOT NULL,
    "duration" INTEGER,
    "concluded" BOOLEAN DEFAULT false,
    "startTime" DATETIME,
    "finishTime" DATETIME,
    CONSTRAINT "PreventiveOS_natureId_fkey" FOREIGN KEY ("natureId") REFERENCES "Nature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreventiveOS_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PreventiveOS" ("actionsUniqueKey", "concluded", "date", "duration", "id", "machineId", "natureId", "weekCode") SELECT "actionsUniqueKey", "concluded", "date", "duration", "id", "machineId", "natureId", "weekCode" FROM "PreventiveOS";
DROP TABLE "PreventiveOS";
ALTER TABLE "new_PreventiveOS" RENAME TO "PreventiveOS";
CREATE UNIQUE INDEX "PreventiveOS_machineId_natureId_weekCode_actionsUniqueKey_key" ON "PreventiveOS"("machineId", "natureId", "weekCode", "actionsUniqueKey");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_PreventiveOSToWorker_AB_unique" ON "_PreventiveOSToWorker"("A", "B");

-- CreateIndex
CREATE INDEX "_PreventiveOSToWorker_B_index" ON "_PreventiveOSToWorker"("B");
