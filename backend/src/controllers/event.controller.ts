import { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import Event from "../models/Event.js"
import { sha256 } from "../crypto/hash.js"

export async function createEvent(req:Request,res:Response) {
  try {
    const { serviceName,eventType,payloadHash }=req.body

    const eventId=uuidv4()
    const timestamp=new Date().toISOString()

    const eventHash=sha256(
      eventId+
      serviceName+
      eventType+
      timestamp+
      payloadHash
    )

    const event=await Event.create({
      eventId,
      serviceName,
      eventType,
      timestamp,
      payloadHash,
      eventHash,
      batchId:null
    })

    res.status(201).json(event)
  } catch(err) {
    res.status(500).json({error:"Failed to create event"})
  }
}