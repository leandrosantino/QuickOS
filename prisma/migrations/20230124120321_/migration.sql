/*
  Warnings:

  - A unique constraint covering the columns `[machineId,natureId,weekCode,actionsUniqueKey]` on the table `PreventiveOS` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PreventiveOS_machineId_natureId_weekCode_key";

-- CreateIndex
CREATE UNIQUE INDEX "PreventiveOS_machineId_natureId_weekCode_actionsUniqueKey_key" ON "PreventiveOS"("machineId", "natureId", "weekCode", "actionsUniqueKey");
