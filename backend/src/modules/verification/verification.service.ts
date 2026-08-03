import { buildMerkleTree, generateProof, verifyProof } from "../../crypto/merkleTree.js"
import { BatchModel } from "../batch/batch.model.js"
import { EventModel } from "../event/event.model.js"

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
        console.log("Stored Root :", batch.merkleRoot)
        console.log("Built Root  :", tree.root)
        const proof=generateProof(tree,leafIndex)
        const verified=verifyProof(event.eventHash,proof,batch.merkleRoot)
        return{
            verified,
            event,
            batch,
            proof
        }
    } // end of verifyEvent()



}