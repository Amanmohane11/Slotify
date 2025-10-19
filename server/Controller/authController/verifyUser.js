
import OTP from "../../Models/otp";


export const reset_Password= async (req,res)=>{
    try {
        const {phone, otp,newPassword,retypePassword}=req.body;
        if(!phone || !otp || !newPassword || !retypePassword){
           return res.status(400).json({message:"All fields required"});
        }
    
        const user=await User.findOne({phone});
        if(!user) return res.status(404).json({message:"User not found"});
        
        const otpRecord = await OTP.findOne({ phone, otp });
        if (!otpRecord) {
          return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        
        if(newPassword !== retypePassword){
          return res.status(400).json({message:" password doesn't match"});
        }
       
    
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(newPassword,salt);
    
        await OTP.deleteMany({ phone });
        await user.save();
        
        res.json({message:"Password reset successfully"});
    } catch (error) {
         res.status(500).json({message:"Server error"});
    }
   
};

