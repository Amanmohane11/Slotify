import User from "../../models/user.js";
import ApiError from "../../utils/ApiError.js"; 



export const getLabReport = async (req, res, next) => {
  try {
    const { userId, familyMemberId, recordId } = req.params;

    const user = await User.findById(userId);
    if (!user) return next(new ApiError(404, "User not found"));

    const familyMember = user.familyMembers.id(familyMemberId);
    if (!familyMember) return next(new ApiError(404, "Family member not found"));

    const medicalRecord = familyMember.medicalrecords.id(recordId);
    if (!medicalRecord) return next(new ApiError(404, "Medical record not found"));

    res.status(200).json({
      message: "Lab reports fetched successfully",
      labReports: medicalRecord.labReports,
    });
  } catch (error) {
    next(new ApiError(500, "Error fetching lab reports"));
  }
};
  
  // Get all prescriptions for a particular diagnosis (medical record)
export const getPrescriptions = async (req, res) => {
    try {
      const { userId, familyMemberId, recordId } = req.params;
  
      // Find user
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // Find family member
      const familyMember = user.familyMembers.id(familyMemberId);
      if (!familyMember) return res.status(404).json({ message: "Family member not found" });
  
      // Find medical record (diagnosis)
      const medicalRecord = familyMember.medicalrecords.id(recordId);
      if (!medicalRecord) return res.status(404).json({ message: "Medical record not found" });
  
      // Return prescriptions only
      res.status(200).json({
        message: "Prescriptions fetched successfully",
        prescriptions: medicalRecord.prescriptions,
      });
  
    } catch (error) {
      res.status(500).json({ message: "Error fetching prescriptions", error: error.message });
    }
  };

  export const getAllMedicalRecords=async (req,res)=>{
    try {
        const {userId, familyMemberId}=req.params;

        const user=await User.findById(userId);
        if(!user) return res.status(404).json({message:"user not found"});

        const familyMember = user.familyMembers.id(familyMemberId);
        if (!familyMember) {
          return res.status(404).json({ message: "Family member not found" });
        }

        res.status(200).json({
            message: "Medical records fetched successfully",
            medicalRecords: familyMember.medicalrecords,
          });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching medical records",
            error: error.message,
          });
    }
  };
