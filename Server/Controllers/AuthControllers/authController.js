import User from "../models/user.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register= async (req,res)=>{
    try{
    const {name, email,password,phone,role }=req.body;
    const user=await User.findOne({phone});
    const userEmail=await User.findOne({email});
    if(userEmail){
        return res.status(400).json({message:"Email is already used"});
    }

    if(!user || !user.isVerified){
        return res.status(400).json({message:"phone not verified"});
    }

    const hash=await bcrypt.hash(password,10);
    
    user.name=name;
    user.email=email;
    user.password=hash;
    user.role=role;
    await user.save();



   

    res.status(201).json({message:"User registered successfully",user});
}catch(error){
    res.status(500).json({message:"Server Error",error:error.message});
}
}

export const login=async (req,res)=>{
    try {
       const {email,phone,password}=req.body;
       const user="";
       if(email){
         user=await User.findOne({email});
       }else{
         user=await User.findOne({phone});
       }
      
       if(!user){
       return res.status(400).json({message:"user not exist"});
       }

       const isMatch=await bcrypt.compare(password,user.password);
       if(!isMatch){
        return res.status(400).json({message:"Invalid Credentials"});
       }

       const token=await jwt.sign(
        {id:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
       );
       res.json({token,user});
    } catch (error) {
        res.status(500).json({message:"Server Error",error:error.message});
    }
};

export const logout=async (req,res)=>{
    try {
       res.clearCookie("token",{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict"
       }) 
       return res.status(200).json({message:"logged out successfully"});
    } catch (error) {
        return res.status(500).json({message:"Error logging out",error:error.message});
    }
};

