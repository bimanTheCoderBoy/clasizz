import { Schema,model } from "mongoose";
const anouncementClassSchema = new Schema({
    anouncementId:{
        type:Schema.Types.ObjectI,
        ref:"Anouncement"
    },
    classId:{
        type:Schema.Types.ObjectId,
        ref:"Class"
    }
})

export const MapAnouncementClass=model("MapAnouncementClass",anouncementClassSchema);