CREATE TABLE
  "PreventiveOS" (
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
  )