import { Schema,model } from "mongoose";
const noteSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    subjectId:{
        type:Schema.Types.ObjectId,
        ref:'Subject',
        required:true,
    },
    link:{
        type:String,
        required:true,
        trim:true,
    }
},{timestamps})

export const Note=model("Note",noteSchema);