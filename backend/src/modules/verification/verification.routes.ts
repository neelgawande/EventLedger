import { Router } from "express"
import { VerificationController } from "./verification.controller.js"

const router=Router()
const verificationController=new VerificationController()

router.get("/:eventId",verificationController.verifyEvent.bind(verificationController))

export default router