import { get } from '../client'
import { type WorkerInfoType } from './worker-types'

type RawWorker = {
  id: number
  registration: number
  name: string
  workerClass: string
}

function mapWorker(raw: RawWorker): WorkerInfoType {
  return {
    id: raw.id,
    registration: raw.registration,
    name: raw.name,
    class: raw.workerClass,
  }
}

export async function getWorkers(): Promise<WorkerInfoType[]> {
  const workers = (await get<RawWorker[]>('/main/workers')) ?? []
  return workers.map(mapWorker)
}

export async function getWorkerByRegistration(
  registration: number,
): Promise<WorkerInfoType | null> {
  const worker = await get<RawWorker>(`/main/workers/registration/${registration}`)
  return worker ? mapWorker(worker) : null
}

export async function getWorkerById(id: number): Promise<WorkerInfoType | null> {
  const worker = await get<RawWorker>(`/main/workers/${id}`)
  return worker ? mapWorker(worker) : null
}
