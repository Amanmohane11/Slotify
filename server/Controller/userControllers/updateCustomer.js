import Appointments from "../../Models/appointmentSchema";
import userSchema from "../../Models/userSchema";

export const update_Profile=async(req,res)=>{
try {
    const {userId , updates}=req.body;
    if(!userId || !updates || Object.keys(updates).length===0){
      return res.status(400).josn({message:"All field required"});
    }

    const updateUser=await userSchema.findByIdAndUpdate(
        userId,
        {$set: updates},
        {new:true, runValidators:true, select: "-otp  -password"}
    );

    if(!updateUser){
        return res.status(404).json({message:"Users not found"});
    }

    return res.status(200).json({
        message:"profile updated successfully",
        user:{
            id:updateUser._id,
            name:updateUser.name,
            email:updateUser?.email || "N/A",
            phone:updatedUser?.phone,
            profileImage:updateUser?.profileImage || "N/A",
        },
    })


} catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
}
}

export const cancel_Booking=async(req,res)=>{
    try {
        const {bookingId}=req.params;
        if(!bookingId) return res.status(400).json({message:"userId not available"});

        const cancelBooking = await Appointments.findByIdAndUpdate(
            bookingId,
            { isActive: false, status: "cancelled" },
            { new: true }
          );

        if(! cancelBooking){
            return res.status(404).json({ message: "Booking not found" });
        }

        return res.status(200).json({
            message:"Booking cancelled successfully",
             booking: {
                 id: cancelBooking._id,
                 date: cancelBooking.date,
                 startTime: cancelBooking.startTime,
                 endTime: cancelBooking.endTime,
                 status: cancelBooking.status,
                 business: cancelBooking.business,
                 professional: cancelBooking.professional,
         },
        })
    } catch (error) {
        console.error("Error cancelling booking:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}