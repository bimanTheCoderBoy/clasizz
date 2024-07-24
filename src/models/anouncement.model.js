import { Schema,model } from "mongoose";
const anouncementSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    subjectId:{
        type:Schema.Types.ObjectId,
        ref:"Subject",
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true
    }

},{timestamps})

export const Anouncement=model("Anouncement",anouncementSchema);