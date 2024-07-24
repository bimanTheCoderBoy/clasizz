import { Schema,model } from "mongoose";
const subjectSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    color:{
        type:String,
        required:true,
        trim:true,
        default:"#000000"
    },
    classId:{
        type:Schema.Types.ObjectId,
        ref:"Class"
    },
    teacherIds:{
      type: [{ type:Schema.Types.ObjectId,
        ref:"User"
       }]
    }
})

export const Subject=model("Subject",subjectSchema);