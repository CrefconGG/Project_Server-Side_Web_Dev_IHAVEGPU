import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import router from './routes/router.js'

const app = express()
const port = 3000

dotenv.config()

const dbUrl = process.env.DB_URL
const connect = async () => {
   try {
      await mongoose.connect(dbUrl)  
      console.log('Connected to MongoDB successfully')
   } catch (error) {
      console.error('Error connecting to MongoDB:', error)
   }
}
await connect()

app.use(express.json())
app.use("/api", router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
