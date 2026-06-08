import express from 'express'
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import eventRoutes from "./api/event.routes.js"

dotenv.config()

const app = express()
app.use(express.json())

app.use("/api/events",eventRoutes)

const PORT = process.env.PORT || 3000

connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
  })
})