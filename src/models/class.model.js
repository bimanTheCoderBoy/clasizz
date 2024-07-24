import { Schema,model } from "mongoose";
const classSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    classCode:{
        type: Number,
        required: true,
        trim: true,
        default:()=>Math.floor(Math.random()*100000)
    },
    color:{
        type:String,
        required:true,
        trim:true,
        default:"#000000"
    },
    subjectIds:{
        type:[{type:Schema.Types.ObjectId,ref:"Subject"}],
        
        
    }

},{timestamps})

export const Class=model("Class",classSchema);