import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import router from './routes/router.js'
import webRouter from './routes/webRouter.js'
import cookieParser from "cookie-parser";
import path from 'path'
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

const app = express()
const port = 3000

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.static('public'));

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

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(cookieParser());

app.use("/api", router)
app.use(webRouter)

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log("Swagger: http://localhost:3000/api-docs");
})
