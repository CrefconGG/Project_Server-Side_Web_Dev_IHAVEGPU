import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const dbUrl = process.env.DB_URL;

const connect = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

await connect();

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Swagger: http://localhost:${port}/api-docs`);
});
