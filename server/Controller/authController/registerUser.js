import User from "../../Models/userSchema";
 
 import bcrypt from "bcryptjs"
import OTP from "../../Models/otp";
import { generateToken } from "../../utils/generateToken";







export const register_login_Customer= async (req,res)=>{
    try {
        const {phone, name, otp }=req.body;
        if(!phone || !otp){
              return res.status(400).json({message: "All fields are required"});
        }

        const otpRecord = await OTP.findOne({ phone, otp });
        if (!otpRecord) {
          return res.status(400).json({ message: "Invalid or expired OTP" });
        }

      

        let user=await User.findOne({phone});
        if(!user){
            if(!name){
                return res.status(400).json({message:"Name is required for new users"});
            }

            user=await User.create({
                name,
                phone,
                role:"customer",
                isVerified:true,
            });
            await  OTP.deleteMany({phone});
            const token=generateToken(user);
            
            return res.status(201).json({message:"Login succesfully",user,token});
        }
           
           await OTP.deleteMany({phone});
           const token=generateToken(newUser);
          return res.status(201).json({message:"customer registered successfully",user:newUser,token});
        
    } catch (error) {
           return res.status(500).json({message:"Server error"});
    }
};

export const register_Business= async (req,res)=>{
    try {
        const {name, phone, email,otp, password}=req.body;
        if(!name || !phone || !email || !otp || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const otpRecord = await OTP.findOne({ phone, otp });
        if (!otpRecord) {
          return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        let existingUser=await user.findOne({phone});
        if(existingUser){
            return res.status(400).json({message:"business already registered"});
        }
        
        const hashPassword=await bcrypt.hash(password,10);
        const newBusiness=new user({
            name,
            phone,
            email,
            hashPassword,
            role:"businessOwner",
            isVerified:true,
        });
        await OTP.deleteMany({phone});
        await newBusiness.save();
        
        const token=generateToken(newBusiness);
        return res.status(201).json({message:"Business registered successfully",user:newBusiness,token});
            } catch (error) {
          return res.status(500).json({message:"Server error"});
    }

}


