import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth-routes.js';
import messagesRoutes from './routes/messages-routes.js';
import matchesRoutes from './routes/matches-routes.js';
import usersRoutes from './routes/users-routes.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/auth/auth",authRoutes);
app.use("/auth/messages",messagesRoutes);
app.use("/auth/matches",matchesRoutes);
app.use("/auth/users",usersRoutes);
const PORT = process.env.PORT || 8001;
app.listen(PORT, () =>{
   connectDB().then(() => {
       console.log(`Server is running on port ${PORT}`);
}).catch((err) => {
    console.error("Failed to connect to the database:", err);
})
}); 