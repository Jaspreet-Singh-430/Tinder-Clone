import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const protectRoute = async (req, res, next) => {
  try {
    const token=req.cookies.jwt;
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, no token"
        })
    }
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed"
        })
    }
    const currentUser=await User.findById(decoded.id);
    req.user=currentUser;
    next();
  } 
  
  catch (error) {
    console.error(error);
    if(error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, invalid token"
        })
    }
    res.status(500).json({
        success: false,
        message: "Server error"
    })
  }
}