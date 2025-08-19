import { register,login } from "../controllers/authController.js";

import { Router } from "express";
import { forgetpassword, resetpassword } from "../controllers/authController2.js";

const userRouter=Router();

userRouter.post("/register", (req, res, next) => {
    console.log("Register route called");
    next();
  }, register);
userRouter.post("/login",login);

userRouter.post("/forgot-password",forgetpassword);
userRouter.post("/reset-password/:token",resetpassword);

export default userRouter;