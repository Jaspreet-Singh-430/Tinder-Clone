import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export const connectDB = async () => {
try{
const conn=await mongoose.connect(process.env.MONGO_URI,{
  serverSelectionTimeoutMS: 30000,
})
console.log(`MongoDB Connected: ${conn.connection.host}`)
}
catch(err){
console.error("Error connecting to MongoDB:", err)
}
}