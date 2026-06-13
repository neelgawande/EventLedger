import { v4 as uuidv4 } from "uuid"
import { BatchModel } from "./batch.model.js"
import { EventModel } from "../event/event.model.js"

export class BatchService {
	async createBatch() {
		const events=await EventModel.find({
			batchId:null
		})
		if(events.length===0){
			return null
		}
		const batchId=uuidv4()
		const eventIds=events.map(
			event=>event.eventId
		)
		const createdAt=new Date().toISOString()
		await EventModel.updateMany(
			{eventId:{$in:eventIds}},
			{$set:{batchId}}
		)
		return await BatchModel.create({
			batchId,
			eventIds,
			status:"pending",
			createdAt
		})
	}
}