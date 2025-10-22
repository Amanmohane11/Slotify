import Appointments from "../../Models/appointmentSchema";
import Users from "../../Models/userSchema";

export const get_Profile=async(req,res)=>{
  try {
    const {userId}=req.params;
    if(!userId) return res.status(400).json({message:"userId not found"});

    const userData=await Users.findById(userId).select("-otp -password");
    if(!userData){
      return res.status(404).json({message:"user not found"})
    }
     
    const formatUser = {
      id: userData._id,
      email: userData?.email || "N/A",
      profileImage: userData?.profile || "N/A",
      phone: userData?.phone || "N/A",
    };
    return res.status(200).json({
      message:"userData fetch successfully",
      user:formatUser,
    })
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
export const get_User_Bookings=async(req,res)=>{
   try {
    const {userId}=req.params;
    if(!userId){
      return  res.status(400).json({message:"user ID is required"});
    }

    const bookings=await Appointments.find({ user: userId })
      .populate("business","name")
       .populate("professional","name")
       .populate("services.service","name price  duration")
       .sort({createdAt: -1});

       if(!bookings || bookings.length===0){
        return res.status(404).json({ message: "No bookings found" });
       }

       const formatBookings=bookings.map((booking)=>({
        id:booking._id,
        businessName:booking.business?.name || "N/A",
        professionalName: booking.professional?.name || "N/A",
        date:booking.date,
        startTime:booking.startTime,
        endTime: booking.endTime,
        totalAmount:booking.totalAmount,
         services:booking.services.map((s)=>({
          name:s.service?.name || "N/A",
          price:s.price,
          duration:s.duration,
         })),
         rescheduleHistory:booking.rescheduleHistory,
         createdAt:booking.createdAt,
       }));
       return res.status(200).json({
        message:"User bookings fetched successfully",
        bookings:formatBookings,
       })
   } catch (error) {
    console.error("Error fetching user bookings:", error);
    return res.status(500).json({ message: "Internal server error" });
   } 
}

