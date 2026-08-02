import { Router } from "express"
import { BatchController } from "./batch.controller.js"

const router=Router()
const batchController=new BatchController()
router.post("/",batchController.create.bind(batchController))
router.get("/:batchId",batchController.getById.bind(batchController))
router.post("/fix-orphans",batchController.fixOrphans.bind(batchController))
router.delete("/:batchId",batchController.delete.bind(batchController))

export default router