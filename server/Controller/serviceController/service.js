import Services from "../../Models/servicesSchema";

export const add_Service=async (req,res)=>{
try {
  const {businessId, name, description , tags, price , duration }=req.body;
  if(!businessId || !name || !description || !tags || !price || !duration ){
    return res.status(400).json({message:"All fields are required"})
  }
   
  const newService=await Services.create({
    business:businessId,
    name,
    description,
    tags,
    price,
    duration,
    isActive:true,
})

return res.status(201).json({
    message:"services added successfully",
    service:newService,
});
} catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ message: "Server error", error: error.message });
}
}


export const update_Service=async (req,res)=>{
try {
    const {businessId, serviceId, updates}=req.body;
    if(!businessId || !serviceId || Object.keys(updates).length === 0){
        return res.status(400).json({message:"businessId, serviceid and updates required"})
    }
    const updatedService = await Services.findOneAndUpdate(
      { _id: serviceId, business: businessId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if(!updatedService){
        return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json({
        message: "Service updated successfully",
        service: updatedService,
      });
} catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Server error", error: error.message });
}
}

export const delete_Service = async (req, res) => {
  try {
    const { serviceId, businessId } = req.params;

    if (!serviceId || !businessId) {
      return res.status(400).json({ message: "Service ID and Business ID are required" });
    }

    // Soft delete (mark inactive)
    const deletedService = await Services.findOneAndUpdate(
      { _id: serviceId, business: businessId },
      { isActive: false },
      { new: true }
    );

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json({
      message: "Service deactivated successfully",
      service: deletedService,
    });

  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const get_business_Services=async (req,res)=>{
try {
      const {businessId}=req.params;
      if(!businessId) return res.status(400).json({message:"businessId not available"});

      const services=await Services.findById({business:businessId});
      if(!services){
        return res.status(404).json({ message: "Services not found" });
      }

      return res.status(201).json({
        message:"services fetched successfully",
        services,
      })
} catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Server error", error: error.message });
}
}

export const get_Service_Byid=async (req,res)=>{
    try {
      const {businessId, serviceId}=req.params;
      if(! businessId || !serviceId){
        return res.status(400).json({message:" businessid and serviceid required"})
      }

      const service=await Services.findOne({_id:serviceId, business:businessId});
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }


      res.status(200).json({ message: "Service fetched successfully", service });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};