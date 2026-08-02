import { v4 as uuidv4 } from 'uuid';
import { sha256 } from '../../crypto/hash.js';
import { stableStringify } from "../../crypto/stringify.js";
import { EventModel } from './event.model.js';
import { CreateEventRequest } from "./event.types.js";
import { BatchModel } from "../batch/batch.model.js"


export class EventService {
    async createEvent(data:CreateEventRequest) {
        const eventId = uuidv4()
        const timestamp = new Date().toISOString()
        const payloadHash = sha256(stableStringify(data.payload))
        const eventHash = sha256(eventId+data.serviceName+data.eventType+timestamp+payloadHash)
        const event = await EventModel.create({
            eventId,
            serviceName: data.serviceName,
            eventType: data.eventType,
            payload:data.payload,
            payloadHash,
            eventHash,
            timestamp,
            batchId:null
        })
        return event
    }
    async getEventById(eventId:string) {
        return await EventModel.findOne({eventId})
    }

    /*THE FOLLOWING IS ONLY INTENDED FOR DEBUG PURPOSES */
    async deleteEventDebug(eventId:string){
        const event=await EventModel.findOne({eventId})
        if(!event){
            return null
        }
        if(event.batchId){
            const batch=await BatchModel.findOne({batchId:event.batchId})
            if(batch){
                const index=batch.eventIds.indexOf(eventId)
                if(index!==-1){
                    batch.eventIds.splice(index,1)
                    batch.eventHashes.splice(index,1)
                    await batch.save()
                }
            }
        }
        await EventModel.deleteOne({eventId})
        return {
            deleted:true,
            eventId
        }
    }
    
}