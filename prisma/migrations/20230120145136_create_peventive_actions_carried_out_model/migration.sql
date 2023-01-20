-- CreateTable
CREATE TABLE "PeventiveActionsCarriedOut" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "osId" INTEGER NOT NULL,
    "actionId" INTEGER NOT NULL,
    "weekCode" TEXT NOT NULL,
    CONSTRAINT "PeventiveActionsCarriedOut_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "PreventiveAction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PeventiveActionsCarriedOut_osId_fkey" FOREIGN KEY ("osId") REFERENCES "PreventiveOS" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
