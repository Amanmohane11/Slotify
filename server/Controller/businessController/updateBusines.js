import Businesses from "../../Models/businessSchema";
import Professionals from "../../Models/professionalSchema";

export const update_Business_Profile=async (req,res)=>{
    try {
        const {businessId}=req.params;
        const update=req.body;
       

        const business=await Businesses.findById(businessId)
        if(business){
            return res.status(400).json({message:"business not found"})
        }
        
        Object.keys(update).forEach((key)=>{
            business[key]=update[key];
        })
        if(req.file){
            business.images.push(req.file.path);
        }

        await business.save();

        res.status(200).json({
            message:"Business profile updated successfully",
            business,
        });
        

    } catch (error) {
    console.error("Error updating business:", error);
    res.status(500).json({ message: "Server error" });

    }
}




export const activate_Bookings=async (req,res)=>{
    try {
        const {type,id, isActive}=req.body;

        if(!type || !id){
            return res.status(400).json({message:"type and ID are required"});
        }

        if (type === "business") {
            const business = await Business.findById(id);
            if (!business) return res.status(404).json({ message: "Business not found" });
      
            business.isBookingActive = isActive ?? !business.isBookingActive;
            await business.save();
      
            return res.status(200).json({
              message: `Bookings ${business.isBookingActive ? "activated" : "deactivated"} for business`,
              business,
            });

        }

        if (type === "appointment") {
            const appointment = await Appointment.findById(id);
            if (!appointment) return res.status(404).json({ message: "Appointment not found" });
      
            appointment.isActive = isActive ?? !appointment.isActive;
            await appointment.save();
      
            return res.status(200).json({
              message: `Appointment ${appointment.isActive ? "activated" : "deactivated"} successfully`,
              appointment,
            });
          }


        res.status(400).json({message:"Invalid type must be 'business' or 'appointment'" })
    } catch (error) {
        console.error("Error activating bookings:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

export const update_Weekly_Shedule_Prof=async (req,res)=>{
try {
    const {professionalsId, updates}=req.body;

    if (!professionalsId || !updates) {
        return res.status(400).json({ message: "Professional ID and updates are required" });
      }
  
      const professional = await Professionals.findById(professionalsId);
      if (!professional) {
        return res.status(404).json({ message: "Professional not found" });
      }

      updates.forEach((update)=>{
        const index=professional.schedule.findIndex(
            (s)=> s.dayOfWeek=== update.dayOfWeek
        );

        if(index>=0){
            professional.schedule[index]={...professional.schedule[index]._doc,...update};
        }else{
            professional.schedule.push(update);
        }
      })

} catch (error) {
    
}
}



export const update_LunchBreak = async (req, res) => {
  try {
    const { professionalId, breakId, startTime, endTime, label } = req.body;

    if (!professionalId || !breakId || !startTime || !endTime) {
      return res.status(400).json({ message: "professionalId, breakId, startTime and endTime are required." });
    }

    const professional = await Professionals.findById(professionalId);
    if (!professional) return res.status(404).json({ message: "Professional not found." });

    const brk = professional.breaks.id(breakId); // find by subdocument ID
    if (!brk) return res.status(404).json({ message: "Break not found." });

    // Update fields
    brk.startTime = startTime;
    brk.endTime = endTime;
    if (label) brk.label = label;

    await professional.save();

    return res.status(200).json({
      message: "Break updated successfully.",
      break: brk,
    });

  } catch (error) {
    console.error("Error updating break:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

    