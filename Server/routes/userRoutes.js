import { Router } from "express";
import { addFamilyMembers, getProfile } from "../controllers/userController";


const userRoutes=Router();

userRoutes.get("/profile",getProfile);
userRoutes.post("/family",addFamilyMembers);
// userRoutes.post("/family/memberId/:memberid/medical",addMedicalRecord);

export default userRoutes;