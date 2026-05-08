import express from 'express';
import {createServer} from "http"
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { initializeSocket } from './socket/socket.js';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth-routes.js';
import messagesRoutes from './routes/messages-routes.js';
import matchesRoutes from './routes/matches-routes.js';
import usersRoutes from './routes/users-routes.js';
import path from "path"
dotenv.config();
const app = express();
const httpServer=createServer(app)
const __dirname=path.resolve() 
initializeSocket(httpServer)
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))
app.use("/auth/auth",authRoutes);
app.use("/auth/messages",messagesRoutes);
app.use("/auth/matches",matchesRoutes);
app.use("/auth/users",usersRoutes);
const PORT = process.env.PORT || 8001;
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"/frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}
httpServer.listen(PORT, () =>{
   connectDB().then(() => {
       console.log(`Server is running on port ${PORT}`);
}).catch((err) => {
    console.error("Failed to connect to the database:", err);
})
}); 