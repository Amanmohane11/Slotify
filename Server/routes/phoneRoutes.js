import {Router } from "express";
import {verifyPhone} from "../controllers/phoneController.js"
const phoneRouter=Router();

phoneRouter.post("/verify",verifyPhone);

export default phoneRouter;