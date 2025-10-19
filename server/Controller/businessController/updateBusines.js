import businesses from "../../Models/businessSchema";
import professionals from "../../Models/professionalSchema";

export const update_Business_Profile=async (req,res)=>{
    try {
        const {businessId}=req.params;
        const update=req.body;
       

        const business=await businesses.findById(businessId)
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
export const update_Professionals=async (req,res)=>{
    try {
        const {professionalsId}=req.params;
        const updates=req.body;

        const professional=await professionals.findById(professionalsId);
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



export const update_Shift_Professionals=async (req,res)=>{
    
}
export const activate_Bookings=async (req,res)=>{
    
}

export const update_Weekly_Shedule_Prof=async (req,res)=>{

}
    