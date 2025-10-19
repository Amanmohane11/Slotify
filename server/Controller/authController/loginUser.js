import User from "../../Models/userSchema";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { tokenBlacklist } from "../../utils/tokenBlacklist";
import BlacklistedToken from "../../Models/InvalidTokenSchema"
import { generateToken } from "../../utils/generateToken";
// helper for permanent JWT


// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET || "secretkey" // ❌ no expiresIn, so never expires
//   );
// };


export const login_Admin= async (req,res)=>{
  try {
     const {email, password }=req.body;
     if(!email || !password){
        return res.status(400).json({message:"All fields required"});
     }
     const admin=await User.findOne({email});
     if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // ✅ Ensure the user is actually an admin
      if (admin.role !== "admin") {
        return res.status(403).json({ message: "Access denied: not an admin" });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // ✅ Generate permanent token
      const token = generateToken(admin);
  
      return res.status(200).json({
        message: "Admin login successful",
        user: admin,
        token,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }  
}

export const login_Business= async (req,res)=>{
    try {
        const {phone, email, password}=req.body;
        if ((!phone && !email) || !password) {
            return res
              .status(400)
              .json({ message: "Phone or email and password are required" });
          }
      
          // ✅ Find user by phone or email
          const business = await User.findOne({
            $or: [{ phone }, { email }],
          });
      
          if (!business) {
            return res.status(404).json({ message: "Business not found" });
          }
      
          // ✅ Ensure role is business owner
          if (business.role !== "businessOwner") {
            return res
              .status(403)
              .json({ message: "Access denied: not a business account" });
          }

              // ✅ Compare password
    const isMatch = await bcrypt.compare(password, business.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate permanent token
    const token = generateToken(business);

    res.status(200).json({
      message: "Business login successful",
      user: business,
      token,
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


export const logout_User= async (req,res)=>{
    try {
       const authHeader=req.headers.authorization;
       if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(400).json({ message: "No token provided" });
       } 
       
       
    const token = authHeader.split(" ")[1];
    const decoded = jwt.decode(token);
    const expiry = new Date(decoded.exp * 1000); // convert to ms
    await BlacklistedToken.create({ token, expiresAt: expiry });

    res.status(200).json({ message: "User logged out successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}