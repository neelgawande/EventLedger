import { z } from 'zod'

export const createEventSchema = z.object({
    serviceName:z.string().min(1),
    eventType:z.string().min(1),
    payload:z.record(z.string().min(1),z.unknown())
})