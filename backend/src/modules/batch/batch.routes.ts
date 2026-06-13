import { Router } from "express"
import { BatchController } from "./batch.controller.js"

const router=Router()
const controller=new BatchController()
router.post("/",controller.create.bind(controller))
router.post("/fix-orphans",controller.fixOrphans.bind(controller))
router.delete("/:batchId",controller.delete.bind(controller))

export default router