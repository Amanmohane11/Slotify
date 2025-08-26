import User from "../models/user";



export const addLabReport=async (req,res)=>{
    try {
        const {userId, familyMemberId, recordId} =req.params;
        const {reportName, fileType, filePath}= req.body;

        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

            const familyMember=user.familyMembers.id(familyMemberId);
            if(!familyMember){
                return res.status(404).json({message:"Family member not exist"});
            }

            const medicalRecord = familyMember.medicalrecords.id(recordId);
            if (!medicalRecord) return res.status(404).json({ message: "Medical record not found" });
            

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
        res.status(500).json({message:"Error adding lab report",error});
    }
};


export const getLabReport=async (req,res)=>{
    try {
        const {userId, familyMemberId,recordId}=req.params;

        const user=await User.findById(userId);
        if(!user) return res.status(404).json({message:"User not found"});

        const familyMember=user.familyMembers.id(familyMemberId);
        if(!familyMember){
            return res.status(404).json({message:"Family member not found"});
        }

        const medicalRecord = familyMember.medicalrecords.id(recordId);
        if (!medicalRecord) return res.status(404).json({ message: "Medical record not found" });
    

        res.status(200).json({
            message:"labRecords fetched successfully",
            labReports: medicalRecord.labReports,
        });
    } catch (error) {
        res.status(500).json({message:"Error fetching lab reports",error});
    }
};

export const deleteLabReport=async (req,res)=>{
try {
    const {userId,familyMemberId,recordId,labReportId}=req.params;

    const user=await User.findById(userId);
    if(!user) return res.status(404).json({message:"User not found"});

    const familyMember=user.familyMembers.id(familyMemberId);
    if (!familyMember) return res.status(404).json({ message: "Family member not found" });

    const medicalRecord=familyMember.medicalrecords.id(recordId);
    if (!medicalRecord) return res.status(404).json({ message: "Medical record not found" });

    const labReport = medicalRecord.labReports.id(labReportId);
    if (!labReport) return res.status(404).json({ message: "Lab report not found" });

    labReport.remove();

    await user.save();

    res.status(200).json({message:"lab report deleted successfully"});

} catch (error) {
    res.status(500).json({message:"Error deleting lab report",error});
}
};

