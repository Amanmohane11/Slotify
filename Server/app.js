import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import phoneRouter from "./routes/phoneRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ReportRoutes from "./routes/reportsRoutes.js";


dotenv.config();
connectDb();

const app=express();

app.use(express.json());
app.use(cors({origin: process.env.FRONTEND_URL,credentials:true}));
app.use(cookieParser());

app.use("/api/auth/phone", phoneRouter);
app.use("/api/auth",authRouter);
app.use("/api/user",userRoutes);
app.use("/api/user",ReportRoutes);



app.listen(process.env.PORT || 5000, ()=>{
    console.log(`server running on port ${process.env.PORT || 5000}`);
} )


