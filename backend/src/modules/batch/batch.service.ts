import { v4 as uuidv4 } from "uuid"
import { BatchModel } from "./batch.model.js"
import { EventModel } from "../event/event.model.js"
import { buildMerkleRoot } from "../../crypto/merkleTree.js"

export class BatchService {
	async fixOrphanEvents(){
		const events=await EventModel.find({batchId:{$ne:null}})
		if(events.length===0){
			return {fixed:0}
		}
		let fixed=0
		for(const event of events){
			const batchExists=await BatchModel.findOne({batchId:event.batchId})
			if(!batchExists){
				await EventModel.updateOne(
					{eventId:event.eventId},
					{$set:{batchId:null}}
				)
				fixed++
			}
		}
		return {fixed}
	}

	async deleteBatch(batchId:string){
		const batch=await BatchModel.findOne({batchId})
		if(!batch){
			return null
		}
		await EventModel.updateMany(
			{batchId},
			{$set:{batchId:null}}
		)
		await BatchModel.deleteOne({batchId})
		return {deleted:true,batchId}
	}

	async createBatch() {
		const events=await EventModel.find({
			batchId:null
		})
		if(events.length===0){
			return null
		}
		const batchId=uuidv4()
		const eventIds=events.map(event=>event.eventId)
		const eventHashes=events.map(e=>e.eventHash)
		const merkleRoot=buildMerkleRoot(eventHashes)
		const createdAt=new Date().toISOString()
		await EventModel.updateMany(
			{eventId:{$in:eventIds}},
			{$set:{batchId}}
		)
		return await BatchModel.create({
			batchId,
			eventIds,
			eventHashes,
			merkleRoot,
			status:"pending",
			createdAt
		})
	}
}