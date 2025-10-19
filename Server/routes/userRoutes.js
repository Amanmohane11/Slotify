import { Router } from "express";
import { addFamilyMembers, getProfile } from "../controllers/userController";
import { authorizeRoles, isAuthenticated } from "../middleware/authMiddleware";


const userRoutes=Router();

userRoutes.get("/profile",isAuthenticated,getProfile);
userRoutes.post("/family",isAuthenticated,authorizeRoles("member"),addFamilyMembers);

export default userRoutes;