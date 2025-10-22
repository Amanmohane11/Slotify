import Professionals from "../../Models/professionalSchema";

export const delete_Professionals=async(req,res)=>{
  try {
    const {professionalId}=req.body;
    
    if(!professionalId){
        return res.status(400).json({message:"ProfessionalId is required"});
    }

    const professional=await Professionals.findById(professionalId);
    if(!professional){
        return res.status(404).json({ message: "Professional not found" });
    }

    await Professionals.findByIdAndDelete(professionalId);

    res.status(200).json({message:"Professional deleted successfully"});
    
  } catch (error) {
    console.error("Error deleting professional:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const delete_Shift=async (req,res)=>{
    try {
        const {professionalId,sheduleId}=req.params;
        if( professionalId || !sheduleId){
            return res.status(400).json({ message: "ProfessionalId and Shedule ID is required" });
        }
        const professional=await Professionals.findById(professionalId);
        if(!professional){
            return res.status(404).json({ message: "professional not found" });  
        }
         
        const index=professional.shedule.findIndex(
            (shedule)=> shedule._id.toString() === sheduleId
        );

        if(!index === -1){
            return res.status(404).json({ message: "shedule not found" }); 
        }

         professional.schedule.splice(index,1);

        await professional.save();

        res.status(200).json({ message: "shedule deleted successfully" });
      } catch (error) {
        console.error("Error deleting shedule:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
}

export const delete_TimeOff = async (req, res) => {
    try {
      const { professionalId, timeOffId } = req.params;
  
      // ✅ 1. Corrected conditional check (both required)
      if (!professionalId || !timeOffId) {
        return res.status(400).json({ message: "Professional ID and TimeOff ID are required" });
      }
  
      // ✅ 2. Find professional
      const professional = await Professionals.findById(professionalId);
      if (!professional) {
        return res.status(404).json({ message: "Professional not found" });
      }
  
      // ✅ 3. Find the index of the timeOff to delete
      const index = professional.timeOff.findIndex(
        (timeoff) => timeoff._id.toString() === timeOffId
      );
  
      // ✅ 4. Check if found
      if (index === -1) {
        return res.status(404).json({ message: "TimeOff not found" });
      }
  
      // ✅ 5. Remove and save
      professional.timeOff.splice(index, 1);
      await professional.save();
  
      return res.status(200).json({ message: "TimeOff deleted successfully" });
    } catch (error) {
      console.error("Error deleting timeOff:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

