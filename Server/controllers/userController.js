import User from "../models/user";

export const getProfile=async (req,res)=>{
    try {
        const user=await User.findById(req.user.id).select("-password");
        res.json(user); 
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
};

export const addFamilyMembers=async (req,res)=>{
  try {
    const {name,age, gender, relation }=req.body;

    const user=await User.findById(req.user.id);
    if(!user){
     return res.status(404).json({message:"User not found"});
    }
    user.familyMembers.push({name,age,gender,relation});
 
    await user.save();
    res.status(201).json({ 
      message: "Family member added successfully",
       familyMembers: user.familyMembers });
  } catch (error) {
    res.status(500).json({message:"Server error"});
  }};



  


