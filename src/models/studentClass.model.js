import { Schema,model } from "mongoose";
const sudentClassSchema = new Schema({
    studentId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    classId:{
        type: Schema.Types.ObjectId,
        ref: "Class"
    },
})

export const MapStudentClass=model("MapStudentClass",sudentClassSchema);