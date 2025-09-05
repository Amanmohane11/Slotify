import jwt from "jsonwebtoken";
import User from "../models/user";
import bcrypt from "bcryptjs";
import transporter from "../config/nodeMailer";


export const forgetpassword=async (req,res)=>{
    try {
        const {email}=req.body;
        const user=await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found"});

        const resetToken=jwt.sign({id:user_id},process.env.JWT_SECRET,{expiresIn:"15m"});
       

        const resetLink=`process.env.FRONTEND_URL/reset-password/${resetToken}`;
        await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to:email,
            subject:"Password Reset",
            text:`click here to reset your password: ${resetLink}`,
        })
        return res.status(200).json({message:"Password reset link sent to email"});
      
    } catch (error) {
        return res.status(500).json({message:"Error sending reset email",error:error.message});
    }
}

export const resetpassword=async (req,res)=>{
    try {
        const {token}=req.params;
        const {newPassword}=req.body;

        const decode=jwt.verify(token, process.env.JWT_SECRET);
        const user=await User.findById(decoded.id);

        if(!user) return res.status(404).json({message:"User not found"});

        const hash=await bcrypt.hash(newPassword,10);
        user.password=hash;
        await user.save();
        return res.status(200).json({message:"Password reset successfully"});
    } catch (error) {
        return res.status(500).json({message:"Invalid or expired token",erro:error.message});
    }
};