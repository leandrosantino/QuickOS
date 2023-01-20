-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PreventiveAction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "machineId" INTEGER NOT NULL,
    "excution" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,
    "nextExecution" TEXT NOT NULL,
    "preventiveOSId" INTEGER,
    "natureId" INTEGER NOT NULL,
    CONSTRAINT "PreventiveAction_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreventiveAction_preventiveOSId_fkey" FOREIGN KEY ("preventiveOSId") REFERENCES "PreventiveOS" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PreventiveAction_natureId_fkey" FOREIGN KEY ("natureId") REFERENCES "Nature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PreventiveAction" ("description", "excution", "frequency", "id", "machineId", "natureId", "nextExecution", "preventiveOSId") SELECT "description", "excution", "frequency", "id", "machineId", "natureId", "nextExecution", "preventiveOSId" FROM "PreventiveAction";
DROP TABLE "PreventiveAction";
ALTER TABLE "new_PreventiveAction" RENAME TO "PreventiveAction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
