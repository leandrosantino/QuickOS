-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PreventiveOS" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "machineId" INTEGER NOT NULL,
    "weekCode" TEXT NOT NULL,
    "responsibleId" INTEGER,
    "date" DATETIME,
    "natureId" INTEGER NOT NULL,
    "concluded" BOOLEAN DEFAULT false,
    CONSTRAINT "PreventiveOS_natureId_fkey" FOREIGN KEY ("natureId") REFERENCES "Nature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreventiveOS_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreventiveOS_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Worker" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PreventiveOS" ("concluded", "date", "id", "machineId", "natureId", "responsibleId", "weekCode") SELECT "concluded", "date", "id", "machineId", "natureId", "responsibleId", "weekCode" FROM "PreventiveOS";
DROP TABLE "PreventiveOS";
ALTER TABLE "new_PreventiveOS" RENAME TO "PreventiveOS";
CREATE UNIQUE INDEX "PreventiveOS_machineId_natureId_weekCode_key" ON "PreventiveOS"("machineId", "natureId", "weekCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
