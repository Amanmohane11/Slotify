import { sendWhatsAppOtp } from "./sendWhatsAppOtp";
import OTP from "../Models/otp";

export const send_otp=async (req,res)=>{
    try {
        const {phone}=req.body;
        if(!phone){
            return res.status(400).json({ message: "Phone number required" });
        }

        const otp=math.floor(1000+math.random()*9000).toString();
        await OTP.create({ phone, otp });
     
    const sent = await sendWhatsAppOtp(phone, otp);
    if (!sent) {
      return res.status(500).json({ message: "Failed to send OTP via WhatsApp" });
    }

    return res.json({ message: "OTP sent successfully via WhatsApp" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};