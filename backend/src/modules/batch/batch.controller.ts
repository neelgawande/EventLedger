import { Request, Response } from "express"
import { BatchService } from "./batch.service.js"

const batchService=new BatchService()

export class BatchController {
	async create(req:Request,res:Response){
		const batch=await batchService.createBatch()
		if(!batch){
			return res.status(200).json({
				message:"No unbatched events found"
			})
		}
		res.status(201).json(batch)
	}

	async fixOrphans(req:Request,res:Response){
		const result=await batchService.fixOrphanEvents()
		res.json(result)
	}
	
	async delete(req:Request,res:Response){
		const result=await batchService.deleteBatch(req.params.batchId.toString())

		if(!result){
			return res.status(404).json({
				message:"Batch not found"
			})
		}

		res.json(result)
	}
}