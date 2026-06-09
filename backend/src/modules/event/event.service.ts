import { CreateEventRequest } from "./event.types.js";
import { v4 as uuidv4 } from 'uuid'
import { EventModel } from './event.model.js'
import { sha256 } from '../../crypto/hash.js'


export class EventService {
    async createEvent(data:CreateEventRequest) {
        const eventId = uuidv4()
        const timestamp = new Date().toISOString()
        const eventHash = sha256(eventId+data.serviceName+data.eventType+timestamp+data.payloadHash)
        const event = await EventModel.create({
            eventId,
            serviceName: data.serviceName,
            eventType: data.eventType,
            payloadHash: data.payloadHash,
            eventHash,
            timestamp,
            batchId:null
        })
        console.log(event)
        return event
    }
}