import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    eventId:{type:String,required:true,unique:true},
    serviceName:{type:String,required:true},
    eventType:{type:String,required:true},
    payload:{type:Object,required:true},
    payloadHash:{type:Object,required:true},
    eventHash:{type:String,required:true},
    timestamp:{type:String,required:true},
    batchId:{type:String,default:null}
})

export const EventModel = mongoose.model("Event",eventSchema)
