const express=require("express")
const app=express()
const cors=require("cors")

const mongoose=require("mongoose")
app.use(cors())
const routes=require("./routes/userRoutes")
require("dotenv").config()

app.use(express.json())
app.use("/api/v1",routes)
app.get("/",(req,res)=>{
    return res.json({
      msg:  "Server is on"
    })
})


 const dbConnect=async()=>{
    await  mongoose.connect(process.env.DB_URL)
    console.log("Database is being connected")


}    


app.listen(4000,{

    "Message":"Server is being started"
})

dbConnect()
