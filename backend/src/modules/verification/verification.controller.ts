import { Request, Response } from "express"
import { VerificationService } from "./verification.service.js"

const verificationService=new VerificationService()

export class VerificationController{

    async verifyEvent(req:Request,res:Response){

        const result=await verificationService.verifyEvent(
            req.params.eventId.toString()
        )

        res.json(result)
    }

}