import { Schema,model } from "mongoose";
const classNoteSchema = new Schema({
    noteId:{
     type: Schema.Types.ObjectId,
        ref: "Note"
    },
    classId:{
        type: Schema.Types.ObjectId,
        ref: "Class"
    },
})

export const MapClassNote=model("MapClassNote",classNoteSchema);