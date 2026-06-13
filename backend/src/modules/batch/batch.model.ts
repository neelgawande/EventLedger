import mongoose from "mongoose"

const batchSchema=new mongoose.Schema({
	batchId:{type:String,required:true,unique:true},
	eventIds:{type:[String],required:true},
	status:{type:String,required:true},
	createdAt:{type:String,required:true}
})

export const BatchModel=mongoose.model("Batch",batchSchema)