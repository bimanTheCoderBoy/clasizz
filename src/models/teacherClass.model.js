import { Schema,model } from "mongoose";
const teacherClassSchema = new Schema({
    teacherId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    classId:{
        type: Schema.Types.ObjectId,
        ref: "Class"
    },
    owner:{
        type:Boolean,
        default: false
    }
})

export const MapTeacherClass=model("MapTeacherClass",teacherClassSchema);