import {Router} from 'express'
import { EventController } from './event.controller.js'

const router = Router()
const eventController = new EventController()

router.post("/",eventController.create.bind(eventController))

export default router