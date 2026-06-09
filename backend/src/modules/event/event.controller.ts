import {Request, Response} from 'express'
import { EventService} from './event.service.js'

const eventService = new EventService()

export class EventController {
    async create(req:Request, res:Response) {
        const result = await eventService.createEvent(req.body)
        res.status(201).json(result)
    }
}