import { BatchModel } from "../batch/batch.model.js"
import { EventModel } from "../event/event.model.js"
import { buildMerkleTree } from "../../crypto/merkleTree.js"

export class VerificationService {

    async verifyEvent(eventId:string){
        const event=await EventModel.findOne({eventId})
        if(!event){
            return{
                verified:false,
                message:"Event not found"
            }
        }
        if(event.batchId===null){
            return{
                verified:false,
                message:"Event is not assigned to a batch"
            }
        }
        const batch=await BatchModel.findOne({
            batchId:event.batchId
        })
        if(!batch){
            return{
                verified:false,
                message:"Batch not found"
            }
        }
        const leafIndex=batch.eventHashes.indexOf(event.eventHash)
        if(leafIndex===-1){
            return{
                verified:false,
                message:"Event hash not found in batch"
            }
        }
        const tree=buildMerkleTree(batch.eventHashes)
        return{
            verified:true,
            event,
            batch
        }
    } // end of verifyEvent()



}