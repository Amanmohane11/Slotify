import User from "../models/user.js";
import ApiError from "../utils/ApiError.js"; 

export const addLabReport = async (req, res, next) => {
  try {
    const { userId, familyMemberId, recordId } = req.params;
    const { reportName, fileType, filePath } = req.body;

    const user = await User.findById(userId);
    if (!user) return next(new ApiError(404, "User not found"));

    const familyMember = user.familyMembers.id(familyMemberId);
    if (!familyMember) return next(new ApiError(404, "Family member not found"));

    const medicalRecord = familyMember.medicalrecords.id(recordId);
    if (!medicalRecord) return next(new ApiError(404, "Medical record not found"));

    const newLabReport = {
      reportName,
      filePath,
      fileType,
      uploadedAt: new Date(),
    };

    medicalRecord.labReports.push(newLabReport);
    await user.save();

    res.status(201).json({
      message: "Lab report added successfully",
      labReport: newLabReport,
    });
  } catch (error) {
    next(new ApiError(500, "Error adding lab report"));
  }
};

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
