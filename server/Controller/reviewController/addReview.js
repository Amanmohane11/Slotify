import Reviews from "../../Models/reviewSchema";

export const add_Review_Salon=async (req,res)=>{
try {
    const {userId , businessId , rating  , comment }=req.body;
    if(!userId || !businessId || rating ){
        return res.status(400).json({message:"All fields required"})
    }
    const newReview=new Reviews({
        reviewer:userId,
        business:businessId,
        rating,
        comment,
        isVerified:true,
    })

    await newReview.save();

    return res.status(201).json({
        message:"Review added successfully",
        review:newReview,
    })
} catch (error) {
    if (error.code === 11000) {
        return res.status(400).json({
          message: "You have already submitted a review for this business",
        });
      }
  
      console.error("Error adding review:", error);
      return res.status(500).json({ message: "Server error" });
}
}

export const delete_Review=async (req,res)=>{

}