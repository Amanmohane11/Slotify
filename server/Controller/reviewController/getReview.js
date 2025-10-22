export const get_business_Reviews=async (req,res)=>{
    try {
       const {businessId}=req.params;
       if(!businessId) return res.status(400).json({message:"business id  not present"});
 
       const profReviews=await Reviews.find({business:businessId});
       if(!profReviews || profReviews===0){
         return res.status(404).json({message:"reviews not available"})
       }
 
       return res.status(200).json({message:"fetched reviews successfully",profReviews});
    } catch (error) {
     console.error("Error fetching reviews:", error);
     res.status(500).json({ message: "Server error" });
    } 
 }

