// import User from "../models/user";
import User from "../../models/user.js";
import ApiError from "../../utils/ApiError.js"; 

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

export const addMedicalRecord = async (req, res) => {
    try {
      const { userId, familyMemberId } = req.params;
      const { diagnosis } = req.body;
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const familyMember = user.familyMembers.id(familyMemberId);
      if (!familyMember) return res.status(404).json({ message: "Family member not found" });
  
      const newRecord = {
        diagnosis,
        uploadedAt: new Date(),
        prescriptions: [],
        labReports: [],
        
      };
  
      familyMember.medicalrecords.push(newRecord);
      await user.save();
  
      const addedRecord = familyMember.medicalrecords[familyMember.medicalrecords.length - 1];
  
      res.status(201).json({
        message: "Medical record added successfully",
        record: addedRecord,
      });
  
    } catch (error) {
      res.status(500).json({ message: "Error adding medical record", error });
    }
  };

  export const addPrescription = async (req, res) => {
    try {
      const { userId, familyMemberId, recordId } = req.params;
      const { doctorName, hospitalName, fileType, filePath } = req.body;
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const familyMember = user.familyMembers.id(familyMemberId);
      if (!familyMember) return res.status(404).json({ message: "Family member not found" });
  
      const medicalRecord = familyMember.medicalrecords.id(recordId);
      if (!medicalRecord) return res.status(404).json({ message: "Medical record not found" });
  
      medicalRecord.prescriptions.push({
        doctorName,
        hospitalName,
        fileType,
        filePath,
        uploadedAt: new Date(),
      });
  
      await user.save();
      res.status(201).json({ message: "Prescription added successfully", medicalRecord });
  
    } catch (error) {
      res.status(500).json({ message: "Error adding prescription", error });
    }
  };


  