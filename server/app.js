import express from "express";
import cors from 'cors';
import  morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from "./Config/DB.js";

dotenv.config();
connectDB();
const app=express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); 

// app.use("api/Auth",);

const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})