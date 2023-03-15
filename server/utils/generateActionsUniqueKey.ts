import { GenerateActionsUniqueKeyParms } from "@schemas/preventive"

export function generateActionsUniqueKey(actions: GenerateActionsUniqueKeyParms) {
  let key = ''
  actions.forEach(({ id, machineId, natureId }) => key += `A-I${id}/M${machineId}/N${natureId}_`)
  return key
}