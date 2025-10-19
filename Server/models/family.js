import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    doctorName: { type: String, required: true },
    hospitalName: { type: String, required: true },
    fileType: { type: String, enum: ["Image", "pdf"], required: true },
    filePath: { type: String, required: true }, // uploaded file path / cloud URL
    uploadedAt: { type: Date, default: Date.now }
  });

  const labReportSchema = new mongoose.Schema({
    reportName: { type: String, required: true },
    fileType: { type: String, enum: ["Image", "pdf"], required: true },
    filePath: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
  });

  // const appointmentSchema = new mongoose.Schema({
  //   department: { type: String },
  //   doctor: { type: String },
  //   date: { type: Date },
  //   time: { type: String },
  //   type: { type: String, enum: ["Emergency", "Regular"] },
  //   queuePosition: { type: Number },
  //   otp: { type: String }
  // });

  const medicalRecordSchema = new mongoose.Schema({
    diagnosis: { type: String, required: true },
    prescriptions: [prescriptionSchema], // Prescriptions for this diagnosis
    labReports: [labReportSchema],       // Lab reports for this diagnosis
    uploadedAt: { type: Date, default: Date.now }    // Appointments for this diagnosis
  });

const familySchema =new mongoose.Schema({
    name: {type: String , required : true},
    age: {type: Number,required: true},
    gender: {type: String, required: true, enum:["Male","Female","other"]},
    relation: {type: String,required:true},
    medicalrecords:[medicalRecordSchema]
});

export default familySchema;