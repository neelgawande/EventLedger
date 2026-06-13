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
}