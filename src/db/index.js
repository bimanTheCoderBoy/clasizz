import mongoose from "mongoose";

export  const dbConnect=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log("MongoDB Connected:: HOST :=: ",connectionInstance.connection.host);
    } catch (error) {
       throw Error("DB Connection Error " );
    }
}
