import { Router } from "express"
import { BatchController } from "./batch.controller.js"

const router=Router()
const controller=new BatchController()
router.post("/",controller.create.bind(controller))
export default router