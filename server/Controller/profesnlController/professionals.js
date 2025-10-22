import Appointments from "../../Models/appointmentSchema";
import Professionals from "../../Models/professionalSchema";


export const get_Professionals_Profile=async (req,res)=>{
    try {
        const {professionalId}=req.params;
        if(!professionalId){
            return res.status(400).json({message:"professionalId is required"})
        }

        const professional=await Professionals.findById(professionalId);
        if(!professional) return res.status(400).json({message:"professional not present"});

        return res.status(200).json({message:"professional fetch successfully",professional});

    } catch (error) {
        console.error("Error fetching professional:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const update_Professionals_Profile=async (req,res)=>{
    try {
        const {professionalsId}=req.params;
        const updates=req.body;

        const professional=await Professionals.findById(professionalsId);
        if(professional){
            return res.status(400).json({message:"professional not found"})
        }

        if(req.user.role!="businessOwner" || req.user._id.toString()!==professional.owner.toString()){
            return res.status(400).json({message:"Unauthorized to update this professional"});
        }


        Object.keys(updates).forEach((key)=>{
            professional[key]=updates[key];
        });
      
        if(req.file){
            professional.photo=req.file.path;
        }

        await professional.save();

       return res.status(200).json({
            message:"Professional updated successfully"
        });

       

        } catch (error) {
            console.error("Error updating professional:", error);
            res.status(500).json({ message: "Server error" });
    }
}


export const get_Professional_Bookings=async (req,res)=>{
    try {
       const {professionalId}=req.params;
       if(!professionalId)return res.status(400).json({message:"professionalId is required"});
       
       const bookings=await Appointments.findById(professional=professionalId);
       if(!bookings || bookings.length===0){
        return res.status(404).json({message:"no booking for this professional"});
       }

       return res.status(200).json({message:"booking fetched successfully",bookings});
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Server error" });
    }
}

