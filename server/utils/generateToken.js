import jwt from "jsonwebtoken";

export const generateToken=(user)=>{
    return jwt.sign(
        {id:user._id,phone:user.phone,role:user.role},
        process.env.JWT_SECRET ,
    );
};