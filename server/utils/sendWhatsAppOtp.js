import axios from "axios"

export const sendWhatsAppOtp=async (phone,otp)=>{
    try {
        const formattedPhone=phone.startsWith("+")?phone:+`91${phone}`;
        const token=process.env.WHATSAPP_TOKEN;
        const phoneNumberId=process.env.WHATSAPP_PHONE_NUMBER_ID;

        const messageData={
            messaging_product:"whatsapp",
            to:formattedPhone,
            type:"template",
            template:{
                name:"otp_verification",
                language:{code:"en_US"},
                components:[
                    {type:"text",text:otp},
                    {type:"text",text:"5  minutes"}
                ]           
             }
        };
        const response=await axios.post(
              `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
              messageData,
              {
              headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type":"application/json",
              },
            }
        );

    console.log("✅ WhatsApp OTP sent:", response.data);
    return true;
  } catch (error) {
    console.error("❌ WhatsApp OTP error:", error.response?.data || error.message);
    return false;
  }
};
