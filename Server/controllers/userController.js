import ambulance from "../models/ambulance";
import doctor from "../models/doctor";
import hospital from "../models/hospital";
import laboratory from "../models/laboratory";
import saloon from "../models/saloon";
import User from "../models/user";
import ApiError from "../utils/ApiError";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    let profile;

    switch(user.role){
      case "doctor":
        profile=await doctor.findOne({user:user._id}).populate("hospital");
        break;
      case "hospital":
        profile =await hospital.findOne({user:user._id});
        break;
      case "laboratory":
        profile =await laboratory.findOne({user:user._id});
        break;
      case "saloon":
        profile =await saloon.findOne({user:user._id});
        break;
      case "ambulance":
        profile =await ambulance.findOne({user:user._id});
        break;  
      default:
        profile=user;
    }

    res.json({user,profile} );
  } catch (error) {
    next(new ApiError(500, "Server error")); // pass to error middleware
  }
};

export const addFamilyMembers = async (req, res, next) => {
  try {
    const { name, age, gender, relation } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    user.familyMembers.push({ name, age, gender, relation });
    await user.save();

    res.status(201).json({
      message: "Family member added successfully",
      familyMembers: user.familyMembers,
    });
  } catch (error) {
    next(new ApiError(500, "Server error"));
  }
};



  


