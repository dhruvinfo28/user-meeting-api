import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDb from "./utils/dbConnection"
import routes from "./routes"


dotenv.config()
const app = express()

//Logging
app.use(morgan("dev"))
//Parsing url-encoded data
app.use(express.urlencoded({extended:false}))
//Parsing json
app.use(express.json())


app.listen(process.env.PORT,async ()=>{
    
    console.log("App is now running!")

    try{
        await connectDb()
        console.log("Connected to database")
    }catch(dbConnectionError){
        console.error("Database connection failed ")
        process.exit(1)
    }

    routes(app)
})