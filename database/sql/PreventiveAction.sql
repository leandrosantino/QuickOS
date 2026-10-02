CREATE TABLE
  "PreventiveAction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "machineId" INTEGER NOT NULL,
    "excution" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,
    "nextExecution" TEXT NOT NULL,
    "preventiveOSId" INTEGER,
    "natureId" INTEGER NOT NULL,
    "ignore" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "PreventiveAction_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PreventiveAction_preventiveOSId_fkey" FOREIGN KEY ("preventiveOSId") REFERENCES "PreventiveOS" ("id") ON DELETE
    SET
      NULL ON UPDATE CASCADE,
      CONSTRAINT "PreventiveAction_natureId_fkey" FOREIGN KEY ("natureId") REFERENCES "Nature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
  )