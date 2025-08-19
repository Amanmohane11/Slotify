import admin from "../config/firebaseAdmin.js";
import User from "../models/user.js";

export const verifyPhone=async (req,res)=>{
    try {
        const {idToken}=req.body;
        if(!idtoken) return res.status(400).json({message: "Missing IdToken"});

        const decode=await admin.auth().verifyIdToken(idToken);

        const phoneNumber=decode.phone_number;
        if(!phoneNumber){
            return res.status(400).json({message:"Phone not present in token"});
        }
        const user=await User.findOne({phone});
        if(!user){
            user=await User.create({phone,isphoneVerified:true});
        }else{
        user.isphoneVerified=true;
        await user.save();
        };

        return res.json({success:true, message:"phone verified",userId:user._id,phone:phoneNumber});
    } catch (error) {
        return res.status(401).json({message:"Invalid or expired firebase token"})
        
    }
}