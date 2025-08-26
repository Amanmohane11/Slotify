import { Router } from "express";

import { addLabReport, deleteLabReport, getLabReport } from "../controllers/reportController";
import { addMedicalRecord, addPrescription, getAllMedicalRecords, getPrescriptions } from "../controllers/medicalController";

const ReportRoutes= Router();

ReportRoutes.post("/:userId/family/:familyMemberId/records",addMedicalRecord);
ReportRoutes.get("/:userId/family/:familyMemberId/records",getAllMedicalRecords);


ReportRoutes.post("/:userId/family/:familyMemberId/records/:recordId/prescriptions",addPrescription);
ReportRoutes.get("/:userId/family/:familyMemberId/records/:recordId/prescriptions",getPrescriptions);


ReportRoutes.post("/:userId/family/:familyMemberId/records/:recordId/labReports",addLabReport);
ReportRoutes.get("/:userid/family/:familyMemberId/labReports",getLabReport);
ReportRoutes.delete("/:userid/family/:familyMemberId/medical/:medicalRecordType/labReports/:labReportId",deleteLabReport);

export default ReportRoutes;