import {Router} from 'express'
import { EventController } from './event.controller.js'

const router = Router()
const eventController = new EventController()

router.post("/",eventController.create.bind(eventController))
router.get("/:eventId",eventController.getById.bind(eventController))

export default router