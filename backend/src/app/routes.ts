import {Router} from 'express'
import eventRoutes from '../modules/event/event.routes.js'
import batchRoutes from "../modules/batch/batch.routes.js"

const router = Router()

router.use('/events',eventRoutes)
router.use("/batches",batchRoutes)

export default router