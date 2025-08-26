import User from "../models/user";

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
        appointments: []
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
  
  