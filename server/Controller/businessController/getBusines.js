import Appointment from "../../Models/appointmentSchema";
import Businesses from "../../Models/businessSchema";
import Professionals from "../../Models/professionalSchema";
// import Reviews from "../../Models/reviewSchema";



export const get_Business_Profile=async (req,res)=>{
    try {
        const {businessId}=req.params;

        const business=await  Businesses.findById(businessId)
        .populate("owner","name email phone");

        if(!business){
            return res.status(404).json({ message: "Business not found" });
        }

        res.status(200).json({
            message: "Business profile fetched successfully",
            business,
        })
    } catch (error) {
        console.error("Error fetching business profile:", error);
    res.status(500).json({ message: "Server error" }); 
    }
}





export const get_All_Professionals=async (req,res)=>{
try {
    const {businessId}=req.params;
    const professional=await Professionals.find({business:businessId,isActive:true}).sort({name:1});


    res.status(200).json({
        message: "Professionals fetched successfully",
        professional,
      });
  
} catch (error) {
    console.error("Error fetching professionals:", error);
    res.status(500).json({ message: "Server error" });
}
}

export const get_business_Bookings=async (req,res)=>{
try {
    const {businessId}=req.params;
    
    const bookings=await Appointment.findById(businessId)
    .populate("customer", "name phone")
    .populate("professional","name specialization")
    .populate("services.service","name price duration")
    .sort({date: 1, startTime:1});

    res.status(200).json({
        message:"Bookings fetched successfully",
        bookings,
    });
} catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
}
}

export const get_business_DashBoardStats=async (req,res)=>{

}

