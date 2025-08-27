import User from "../models/user";
import ApiError from "../utils/ApiError";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    res.json(user);
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



  


