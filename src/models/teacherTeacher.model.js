import { Schema,model } from "mongoose";
const teacherTeacherSchema = new Schema({
    teacherId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    teacherId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

export const MapTeacherTeacher=model("MapTeacherTeacher",teacherTeacherSchema);