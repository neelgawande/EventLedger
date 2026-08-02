import { Router } from 'express'
import { EventController } from './event.controller.js'

const router = Router()
const eventController = new EventController()

router.post("/",eventController.create.bind(eventController))
router.get("/:eventId",eventController.getById.bind(eventController))
router.delete("/:eventId",eventController.delete.bind(eventController))

export default router