import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuthenticated=async (req,res,next)=>{
    try {
        const token=req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            return res.status(401).json({message:"No token, authorization denied"});
        }

        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id).select("-password");
        if(!req.user){
            return res.status(401).json({message:"User not found"});
        }
        next();
    } catch (error) {
       res.status(401).json({message:"Token is not valid", error: error.message}); 
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    };
  };