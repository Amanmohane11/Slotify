import User from "../../models/user.js";
import ApiError from "../../utils/ApiError.js"; 

export const deleteLabReport = async (req, res, next) => {
    try {
      const { userId, familyMemberId, recordId, labReportId } = req.params;
  
      const user = await User.findById(userId);
      if (!user) return next(new ApiError(404, "User not found"));
  
      const familyMember = user.familyMembers.id(familyMemberId);
      if (!familyMember) return next(new ApiError(404, "Family member not found"));
  
      const medicalRecord = familyMember.medicalrecords.id(recordId);
      if (!medicalRecord) return next(new ApiError(404, "Medical record not found"));
  
      const labReport = medicalRecord.labReports.id(labReportId);
      if (!labReport) return next(new ApiError(404, "Lab report not found"));
  
      labReport.remove();
      await user.save();
  
      res.status(200).json({ message: "Lab report deleted successfully" });
    } catch (error) {
      next(new ApiError(500, "Error deleting lab report"));
    }
  };


  export const deletePrescription=async (req,res,next)=>{
    try {
      const {userId,familyMemberId,recordId,prescriptionId} = req.params;
      const user=await User.findById(userId);
      if(!user) return next(new ApiError(404,"user not found"));

      const familyMember=await user.familyMembers.id(familyMemberId);
      if(!familyMember) return next(new ApiError404,"family member not found");

      const medicalRecord=await familyMember.medicalrecords.id(recordId);
      if(!medicalRecord) return next(ApiError(404,"medical record not found"));

      const prescription=await medicalRecord.prescriptions.id(prescriptionId);
      if(!prescription) return next(ApiError(404,"prescription not found"));

      prescription.remove();
      await user.save()

      res.status(200).json({message:"Prescription delete successfully"});

    } catch (error) {
      next(ApiError(500,"Error deleting rescription"));
    }
  }