import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded( { extended : true,limit:'16kb' } ))
app.use(cookieParser())

//Routes




//Error handlers
// import {errorHandler} from './utils/errorHandler.js'
// app.use(errorHandler)
export default app