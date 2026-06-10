import {Request, Response} from 'express'
import { EventService} from './event.service.js'
import { createEventSchema } from "./event.validation.js"

const eventService = new EventService()

export class EventController {
    async create(req:Request, res:Response) {
        const parsed = createEventSchema.safeParse(req.body)
        if(!parsed.success){
            return res.status(400).json({
                message:"Invalid request",
                errors:parsed.error.issues
            })
        }
        const result = await eventService.createEvent(parsed.data)
        res.status(201).json(result)
    }
    async getById(req:Request,res:Response) {
        const event=await eventService.getEventById(req.params.eventId.toString())
        if(!event){
            return res.status(404).json({
                message:"Event not found"
            })
        }
        res.json(event)
    }
}