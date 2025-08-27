import { Router } from "express";

import { addLabReport, deleteLabReport, getLabReport } from "../controllers/reportController";
import { addMedicalRecord, addPrescription, getAllMedicalRecords, getPrescriptions } from "../controllers/medicalController";
import { authorizeRoles, isAuthenticated } from "../middleware/authMiddleware";

const ReportRoutes= Router();

ReportRoutes.post("/:userId/family/:familyMemberId/records",isAuthenticated,authorizeRoles("doctor","member"),addMedicalRecord);
ReportRoutes.get("/:userId/family/:familyMemberId/records",isAuthenticated,authorizeRoles("member","doctor"),getAllMedicalRecords);


ReportRoutes.post("/:userId/family/:familyMemberId/records/:recordId/prescriptions",isAuthenticated,authorizeRoles("member","doctor"),addPrescription);
ReportRoutes.get("/:userId/family/:familyMemberId/records/:recordId/prescriptions",isAuthenticated,authorizeRoles("member","doctor"),getPrescriptions);


ReportRoutes.post("/:userId/family/:familyMemberId/records/:recordId/labReports",isAuthenticated,authorizeRoles("doctor","hospital"),addLabReport);
ReportRoutes.get("/:userid/family/:familyMemberId/labReports",isAuthenticated,authorizeRoles("member","doctor","hospital"),getLabReport);
ReportRoutes.delete("/:userid/family/:familyMemberId/medical/:medicalRecordType/labReports/:labReportId",isAuthenticated,authorizeRoles("doctor","hospital","admin"),deleteLabReport);

export default ReportRoutes;