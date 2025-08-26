import { register,login } from "../controllers/authController.js";

import { Router } from "express";
import { forgetpassword, resetpassword } from "../controllers/authController2.js";

const authRouter=Router();

authRouter.post("/register", (req, res, next) => {
    console.log("Register route called");
    next();
  }, register);
authRouter.post("/login",login);

authRouter.post("/forgot-password",forgetpassword);
authRouter.post("/reset-password/:token",resetpassword);

export default authRouter;