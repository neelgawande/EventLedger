import {Router} from 'express'
import eventRoutes from '../modules/event/event.routes.js'
import batchRoutes from "../modules/batch/batch.routes.js"
import verificationRoutes from "../modules/verification/verification.routes.js"

const router = Router()

router.use('/events',eventRoutes)
router.use("/batches",batchRoutes)
router.use("/verify",verificationRoutes)

export default router